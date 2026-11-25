import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();

// ===============================
// حماية محاولات الدخول — لكل مستخدم لحاله
// ===============================
export const checkRateLimit = functions.https.onCall(async (data) => {
  const email = data.email;

  if (!email) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email is required'
    );
  }

  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;

  const attemptsSnapshot = await admin.firestore()
    .collection('login_attempts')
    .where('email', '==', email)
    .where('timestamp', '>=', oneMinuteAgo)
    .get();

  const totalAttempts = attemptsSnapshot.size;

  if (totalAttempts >= 9) {
    throw new functions.https.HttpsError(
      'resource-exhausted',
      'تم تجاوز الحد الأقصى لمحاولات الدخول لهذا الحساب. حاول بعد دقيقة.'
    );
  }

  return {
    allowed: true,
    attempts: totalAttempts
  };
});


// ===============================
// تسجيل محاولة الدخول
// ===============================
export const logLoginAttempt = functions.https.onCall(
  async (data, context) => {
    const email = data.email;
    const success = data.success || false;
    const ip =
      context.rawRequest?.ip || 'unknown';

    if (!email) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Email is required'
      );
    }

    await admin.firestore()
      .collection('login_attempts')
      .add({
        email,
        ip,
        timestamp: Date.now(),
        success
      });

    return {
      logged: true
    };
  }
);


// ===============================
// تغيير دور المستخدم
// Director فقط
// ===============================
export const changeUserRole = functions.https.onCall(async (data, context) => {

  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'يجب تسجيل الدخول'
    );
  }

  const callerRole =
    context.auth.token.role;

  if (callerRole !== 'director') {
    throw new functions.https.HttpsError(
      'permission-denied',
      'ليس لديك صلاحية تغيير الأدوار'
    );
  }

  const uid = data.uid;
  const role = data.role;

  const allowedRoles = [
    'director',
    'deputy',
    'admin',
    'user'
  ];

  if (!allowedRoles.includes(role)) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'دور غير صالح'
    );
  }

  // تحديث Custom Claims
  await admin.auth()
    .setCustomUserClaims(uid, {
      role
    });

  // تحديث Firestore
  await admin.firestore()
    .collection('users')
    .doc(uid)
    .set({
      role,
      updatedAt:
        admin.firestore.FieldValue.serverTimestamp()
    }, {
      merge: true
    });

  return {
    success: true,
    uid,
    role
  };

});

// ===============================
// حذف محاولات الدخول القديمة
// ===============================
export const cleanupOldAttempts =
  functions.pubsub
    .schedule('0 * * * *')
    .onRun(async () => {

      const oneHourAgo =
        Date.now() - 60 * 60 * 1000;

      const oldAttempts =
        await admin.firestore()
          .collection('login_attempts')
          .where(
            'timestamp',
            '<',
            oneHourAgo
          )
          .get();

      const batch =
        admin.firestore().batch();

      oldAttempts.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      console.log(
        `Cleaned ${oldAttempts.size} old attempts`
      );

      return null;
    });


// نشر المحتوى المجدول على الموقع عند حلول موعده
export const publishScheduledContent = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async () => {
    const db = admin.firestore();
    const now = Date.now();

    const snapshot = await db.collection('content')
      .where('status', '==', 'scheduled')
      .get();

    let published = 0;

    for (const item of snapshot.docs) {
      await db.runTransaction(async (transaction) => {
        const current = await transaction.get(item.ref);
        if (!current.exists) return;

        const data = current.data();
        if (!data || data.status !== 'scheduled') return;
        if (data.approved !== true) return;
        if (!(data.title || data.titleAr)) return;

        const value = data.scheduledAt;
        let dueAt = NaN;

        if (typeof value === 'string') {
          dueAt = Date.parse(value);
        } else if (value && typeof value.toMillis === 'function') {
          dueAt = value.toMillis();
        } else if (value instanceof Date) {
          dueAt = value.getTime();
        }

        if (!Number.isFinite(dueAt) || dueAt > now) return;

        transaction.update(item.ref, {
          status: 'published',
          publishedAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        published++;
      });
    }

    console.log(`Scheduled publishing completed: ${published} item(s).`);
    return null;
  });
