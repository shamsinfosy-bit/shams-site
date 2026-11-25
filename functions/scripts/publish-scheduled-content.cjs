const admin = require('firebase-admin');

function damascusMinutes() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Damascus',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date());

  const hour = Number(parts.find(p => p.type === 'hour').value);
  const minute = Number(parts.find(p => p.type === 'minute').value);
  return hour * 60 + minute;
}

async function main() {
  const minuteOfDay = damascusMinutes();

  if (minuteOfDay < 20 * 60 || minuteOfDay >= 21 * 60) {
    console.log('Outside Syria publishing window; no changes made.');
    return;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('Missing FIREBASE_SERVICE_ACCOUNT secret');

  const serviceAccount = JSON.parse(raw);
  if (serviceAccount.project_id !== 'shams-1db5a') {
    throw new Error('Service account project mismatch');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db = admin.firestore();
  const snapshot = await db.collection('content')
    .where('status', '==', 'scheduled')
    .get();

  let published = 0;

  for (const item of snapshot.docs) {
    const didPublish = await db.runTransaction(async (tx) => {
      const current = await tx.get(item.ref);
      if (!current.exists) return false;

      const data = current.data();
      if (data.status !== 'scheduled' || data.approved !== true) return false;
      if (!(data.title || data.titleAr)) return false;

      let dueAt = NaN;
      const value = data.scheduledAt;

      if (typeof value === 'string') dueAt = Date.parse(value);
      else if (value && typeof value.toMillis === 'function') dueAt = value.toMillis();
      else if (value instanceof Date) dueAt = value.getTime();

      if (!Number.isFinite(dueAt) || dueAt > Date.now()) return false;

      const nowInSyria = damascusMinutes();
      if (nowInSyria < 20 * 60 || nowInSyria >= 21 * 60) return false;

      tx.update(item.ref, {
        status: 'published',
        publishedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return true;
    });

    if (didPublish) published++;
  }

  console.log(`Finished. Newly published: ${published}`);
}

main().catch((err) => {
  console.error('Publishing failed:', err.message);
  process.exitCode = 1;
});
