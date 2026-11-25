const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

const PUBLIC_FIELDS = [
  'title',
  'titleAr',
  'description',
  'category',
  'mediaType',
  'youtubeId',
  'thumbnail',
  'thumbnailUrl',
  'affiliateWatchUrl',
  'affiliateEnabled',
];

async function commitOperations(operations) {
  const CHUNK_SIZE = 450;

  for (let i = 0; i < operations.length; i += CHUNK_SIZE) {
    const batch = db.batch();
    const chunk = operations.slice(i, i + CHUNK_SIZE);

    for (const operation of chunk) {
      if (operation.type === 'set') {
        batch.set(operation.ref, operation.data, { merge: true });
      } else if (operation.type === 'delete') {
        batch.delete(operation.ref);
      }
    }

    await batch.commit();
  }
}

async function main() {
  console.log('بدء المزامنة الكاملة لـ publicContent...');

  const [publishedSnapshot, publicSnapshot] = await Promise.all([
    db.collection('content')
      .where('status', '==', 'published')
      .get(),
    db.collection('publicContent').get(),
  ]);

  console.log(`العناصر المنشورة في content: ${publishedSnapshot.size}`);
  console.log(`العناصر الموجودة في publicContent: ${publicSnapshot.size}`);

  const operations = [];
  const publishedIds = new Set();

  for (const sourceDoc of publishedSnapshot.docs) {
    publishedIds.add(sourceDoc.id);

    const data = sourceDoc.data();
    const publicData = {
      id: sourceDoc.id,
      status: 'published',
      updatedAt: FieldValue.serverTimestamp(),
    };

    for (const field of PUBLIC_FIELDS) {
      if (data[field] !== undefined) {
        publicData[field] = data[field];
      }
    }

    operations.push({
      type: 'set',
      ref: db.collection('publicContent').doc(sourceDoc.id),
      data: publicData,
    });
  }

  let staleCount = 0;

  for (const publicDoc of publicSnapshot.docs) {
    if (!publishedIds.has(publicDoc.id)) {
      operations.push({
        type: 'delete',
        ref: publicDoc.ref,
      });
      staleCount++;
    }
  }

  console.log(`عمليات التحديث/الإضافة: ${publishedSnapshot.size}`);
  console.log(`العناصر القديمة التي ستُحذف من publicContent: ${staleCount}`);
  console.log(`إجمالي العمليات: ${operations.length}`);

  await commitOperations(operations);

  console.log('تمت المزامنة الكاملة بنجاح.');
}

main().catch((error) => {
  console.error('فشل التنفيذ:', error.message);
  process.exit(1);
});
