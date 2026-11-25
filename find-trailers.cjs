/**
 * سكريبت البحث عن تريلرات يوتيوب الرسمية للمحتوى الموجود بحالة "draft"
 * وتحديثها بـ youtubeId + نشرها تلقائياً
 * الاستخدام: node find-trailers.cjs
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const axios = require('axios');
const path = require('path');

const YOUTUBE_API_KEY = 'AIzaSyDQHD_pXYQu54TeOLrktTD_CgEovZsGjPE';
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const BATCH_LIMIT = 9;

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

async function searchTrailer(title, category) {
  const query = category === 'series'
    ? `${title} official trailer series`
    : `${title} official trailer movie`;

  try {
    const { data } = await axios.get(YOUTUBE_SEARCH_URL, {
      params: {
        key: YOUTUBE_API_KEY,
        q: query,
        part: 'snippet',
        type: 'video',
        maxResults: 1,
        videoEmbeddable: 'true',
      },
    });

    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    }
    return null;
  } catch (err) {
    console.error(`  ⚠️  خطأ بالبحث عن "${title}":`, err.response?.data?.error?.message || err.message);
    return null;
  }
}

async function main() {
  console.log('🔍 جاري البحث عن العناصر بحالة "draft"...\n');

  const snap = await db.collection('content')
    .where('status', '==', 'draft')
    .orderBy('createdAt', 'asc')
    .limit(BATCH_LIMIT)
    .get();

  if (snap.empty) {
    console.log('لا يوجد عناصر بحالة "draft" حالياً.');
    process.exit(0);
  }

  console.log(`تم إيجاد ${snap.size} عنصر. جاري البحث عن التريلرات...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const doc of snap.docs) {
    const data = doc.data();
    const title = data.title || data.titleAr;

    const videoId = await searchTrailer(title, data.category);

    if (videoId) {
      await doc.ref.update({
        youtubeId: videoId,
        status: 'published',
        updatedAt: FieldValue.serverTimestamp(),
      });
      console.log(`  ✅ ${title} → https://youtu.be/${videoId}`);
      successCount++;
    } else {
      console.log(`  ❌ ${title} — ما لقينا تريلر مناسب`);
      failCount++;
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`\n🎉 انتهى! تم نشر ${successCount} عنصر، وفشل ${failCount} عنصر.`);
  console.log('راجع لوحة التحكم > Content للتأكد من صحة الروابط.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ حدث خطأ:', err.message);
  process.exit(1);
});
