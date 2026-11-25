/**
 * سكريبت النشر اليومي — يعمل كل يوم الساعة 9:00 مساءً عبر cron
 * 1. ينشر كل عنصر بحالة "scheduled" (بغض النظر عن نوعه)
 * 2. يبحث عن تريلرات لعدد محدد من عناصر "draft" الجديدة وينشرها
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const YOUTUBE_API_KEY = 'AIzaSyDQHD_pXYQu54TeOLrktTD_CgEovZsGjPE';
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const LOG_FILE = path.join(__dirname, 'daily-publish.log');

const NEW_TRAILERS_PER_DAY = 27;

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

async function searchTrailer(title, category) {
  const query = category === 'music'
    ? `${title} official music video`
    : category === 'series'
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
    log(`  ⚠️ خطأ بالبحث عن "${title}": ${err.response?.data?.error?.message || err.message}`);
    return null;
  }
}

async function publishScheduled() {
  log('=== المرحلة 1: نشر المحتوى المجدول ===');
  const snap = await db.collection('content').where('status', '==', 'scheduled').get();

  if (snap.empty) {
    log('لا يوجد محتوى مجدول للنشر اليوم.');
    return 0;
  }

  let count = 0;
  for (const doc of snap.docs) {
    await doc.ref.update({
      status: 'published',
      publishedAt: FieldValue.serverTimestamp(),
    });
    const data = doc.data();
    log(`  ✅ نُشر: ${data.title || data.titleAr || doc.id}`);
    count++;
  }
  return count;
}

async function publishNewTrailers() {
  log(`\n=== المرحلة 2: اختيار 27 عنصرًا يوميًا (9 أفلام + 9 مسلسلات + 9 أغاني) ===`);

  const TARGET_PER_CATEGORY = 9;
  const TARGET_TOTAL = NEW_TRAILERS_PER_DAY;

  async function getDrafts(category, limit = TARGET_PER_CATEGORY) {
    return db.collection('content')
      .where('status', '==', 'draft')
      .where('category', '==', category)
      .orderBy('createdAt', 'asc')
      .limit(limit)
      .get();
  }

  const categories = ['movies', 'series', 'music'];
  const selected = [];

  // أولاً: نأخذ 3 مسودات من كل فئة.
  for (const category of categories) {
    const snap = await getDrafts(category);
    log(`  📊 المسودات [${category}]: ${snap.size}`);

    for (const doc of snap.docs) {
      selected.push(doc);
    }
  }

  // إذا نقصت فئة عن 3، نعوّض من مسودات الفئات الأخرى فقط.
  // لا نضيف محتوى منشورًا هنا حتى لا نعيد الترويج له دون حاجة.
  if (selected.length < TARGET_TOTAL) {
    const selectedIds = new Set(selected.map((doc) => doc.id));

    const extraSnap = await db.collection('content')
      .where('status', '==', 'draft')
      .orderBy('createdAt', 'asc')
      .limit(TARGET_TOTAL * 5)
      .get();

    for (const doc of extraSnap.docs) {
      if (!selectedIds.has(doc.id)) {
        selected.push(doc);
        selectedIds.add(doc.id);
      }

      if (selected.length >= TARGET_TOTAL) break;
    }
  }

  if (selected.length === 0) {
    log('لا يوجد محتوى مسودة متاح للنشر اليوم.');
    return 0;
  }

  if (selected.length < TARGET_TOTAL) {
    log(`  ⚠️ المتاح اليوم ${selected.length} فقط من أصل ${TARGET_TOTAL}. سيتم نشر المتاح.`);
  }

  let count = 0;

  for (const doc of selected.slice(0, TARGET_TOTAL)) {
    const data = doc.data();
    const title = data.title || data.titleAr || doc.id;

    // إذا كان للمحتوى YouTube ID محفوظ مسبقاً، نستخدمه.
    // وإلا نبحث عن فيديو مناسب.
    const videoId = data.youtubeId || await searchTrailer(title, data.category);

    if (videoId) {
      await doc.ref.update({
        youtubeId: videoId,
        status: 'published',
        publishedAt: FieldValue.serverTimestamp(),
      });

      log(`  ✅ [${data.category}] ${title} → https://youtu.be/${videoId}`);
      count++;
    } else {
      log(`  ❌ [${data.category}] ${title} — لم يتم العثور على فيديو مناسب`);
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  return count;
}

async function main() {
  log('\n========================================');
  log('بدء عملية النشر اليومي');

  const scheduledCount = await publishScheduled();
  const trailersCount = await publishNewTrailers();

  log(`\n🎉 انتهت العملية: ${scheduledCount} عنصر مجدول + ${trailersCount} تريلر جديد نُشروا.`);
  log('========================================\n');
  process.exit(0);
}

main().catch((err) => {
  log(`❌ خطأ عام: ${err.message}`);
  process.exit(1);
});
