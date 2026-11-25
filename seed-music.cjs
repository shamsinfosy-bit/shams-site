const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// نقرأ المفتاح الموجود حاليًا في daily-publish.cjs بدون طباعته.
const dailyScript = fs.readFileSync(
  path.join(__dirname, 'daily-publish.cjs'),
  'utf8'
);

const keyMatch = dailyScript.match(
  /const YOUTUBE_API_KEY\s*=\s*['"]([^'"]+)['"]/
);

if (!keyMatch) {
  throw new Error('لم يتم العثور على YOUTUBE_API_KEY في daily-publish.cjs');
}

const YOUTUBE_API_KEY = keyMatch[1];

const QUERIES = [
  { language: 'arabic', query: 'Arabic official music video' },
  { language: 'arabic', query: 'Arabic song official video' },
  { language: 'foreign', query: 'official music video' },
  { language: 'foreign', query: 'new song official music video' },
];

const TARGET_TOTAL = 20;

async function searchMusic(query) {
  const { data } = await axios.get(YOUTUBE_SEARCH_URL, {
    params: {
      key: YOUTUBE_API_KEY,
      q: query,
      part: 'snippet',
      type: 'video',
      maxResults: 10,
      videoEmbeddable: 'true',
    },
  });

  return data.items || [];
}

async function main() {
  console.log('=== بدء تجهيز موسيقى SHAMS ===');

  const existing = await db.collection('content')
    .where('category', '==', 'music')
    .get();

  const existingYoutubeIds = new Set(
    existing.docs
      .map(doc => doc.data().youtubeId)
      .filter(Boolean)
  );

  const found = new Map();

  for (const item of QUERIES) {
    console.log(`🔎 البحث: ${item.query}`);

    const results = await searchMusic(item.query);

    for (const result of results) {
      const videoId = result.id?.videoId;
      const snippet = result.snippet;

      if (!videoId || !snippet) continue;
      if (existingYoutubeIds.has(videoId)) continue;
      if (found.has(videoId)) continue;

      found.set(videoId, {
        videoId,
        language: item.language,
        title: snippet.title || '',
        channelTitle: snippet.channelTitle || '',
        description: snippet.description || '',
        thumbnailUrl:
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          snippet.thumbnails?.default?.url ||
          '',
      });

      if (found.size >= TARGET_TOTAL) break;
    }

    if (found.size >= TARGET_TOTAL) break;
  }

  console.log(`📊 تم العثور على ${found.size} فيديو موسيقي جديد.`);

  if (found.size === 0) {
    console.log('لا توجد نتائج جديدة لإضافتها.');
    return;
  }

  let created = 0;

  for (const item of found.values()) {
    const ref = db.collection('content').doc();

    await ref.set({
      title: item.title,
      titleAr: item.language === 'arabic' ? item.title : '',
      artist: item.channelTitle,
      language: item.language,
      category: 'music',
      description: item.description,
      mediaType: 'video',
      youtubeId: item.videoId,
      thumbnailUrl: item.thumbnailUrl,
      url: '',
      status: 'draft',
      source: 'youtube-seed',
      uploadedBy: 'music-seed',
      views: 0,
      createdAt: FieldValue.serverTimestamp(),
    });

    created++;
    console.log(`  ✅ تمت إضافة: ${item.title}`);
  }

  console.log(`\n🎵 اكتمل تجهيز ${created} أغنية كمسودات.`);
}

main().catch(err => {
  console.error(`❌ خطأ: ${err.message}`);
  process.exit(1);
});
