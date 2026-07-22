import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';

admin.initializeApp();


// ===============================
// حماية محاولات الدخول
// ===============================

export const checkRateLimit = functions.https.onCall(async () => {

  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;

  const attemptsSnapshot = await admin.firestore()
    .collection('login_attempts')
    .where('timestamp', '>=', oneMinuteAgo)
    .get();

  const totalAttempts = attemptsSnapshot.size;

  if (totalAttempts >= 16) {

    throw new functions.https.HttpsError(
      'resource-exhausted',
      'تم تجاوز الحد الأقصى لمحاولات الدخول.'
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

});


// ===============================
// تغيير دور المستخدم
// Director فقط
// ===============================

export const changeUserRole = functions.https.onCall(
async (data, context) => {


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
