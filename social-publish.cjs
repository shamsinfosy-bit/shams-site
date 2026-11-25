/**
 * سكريبت نشر تلقائي على Buffer — دوران يومي بين المنصات
 * كل يوم يُنشر المحتوى الجديد على منصة واحدة فقط (يوتيوب/فيسبوك/انستقرام بالتناوب)
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const https = require('https');
const path = require('path');
const fs = require('fs');

const BUFFER_API_KEY = process.env.BUFFER_API_KEY;
const ORGANIZATION_ID = '6aab8420fb6d4fb445734ee5';

const CHANNELS = {
  youtube: '6aaf783fea19ca0bde9319f2',
  instagram: '6aab877cea19ca0bde6509e1',
  facebook: '6aab8631ea19ca0bde65007e',
};

// دوران يومي: كل يوم قناة وحدة بس، ما ينشر نفس المحتوى على منصتين بنفس اليوم
// رجّع فيسبوك/انستقرام لهاي القائمة لما يترفع تعليق الحساب
const ROTATION = [CHANNELS.youtube, CHANNELS.facebook, CHANNELS.instagram];

function getTodaysChannel() {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return ROTATION[dayIndex % ROTATION.length];
}

const ACTIVE_CHANNELS = [getTodaysChannel()];

const SITE_URL = 'https://shams-1db5a.web.app';
// وضع آمن: لا ينشر فعليًا إلا عند تعطيله صراحةً من البيئة.
const DRY_RUN = process.env.SHAMS_SOCIAL_DRY_RUN !== 'false';
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');
const LOG_FILE = path.join(__dirname, 'social-publish.log');

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

function bufferGraphQL(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });
    const options = {
      hostname: 'api.buffer.com',
      path: '/',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${BUFFER_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('فشل تحليل رد Buffer: ' + body));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function createPost(channelId, text) {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        ... on Post {
          id
        }
        ... on PostError {
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      organizationId: ORGANIZATION_ID,
      channelId,
      content: { text },
      mode: 'sharenow',
    },
  };
  return bufferGraphQL(mutation, variables);
}

async function main() {
  log('=== بدء النشر على السوشال ميديا ===');
  log(`القناة النشطة اليوم: ${ACTIVE_CHANNELS[0]}`);

  const snap = await db
    .collection('content')
    .where('status', '==', 'published')
    .orderBy('publishedAt', 'desc')
    .limit(50)
    .get();

  const pendingDocs = snap.docs
    .filter(doc => doc.data().sharedSocial !== true)
    .slice(0, 3);

  if (pendingDocs.length === 0) {
    log('لا يوجد محتوى جديد للمشاركة.');
    process.exit(0);
  }

  for (const doc of pendingDocs) {
    const data = doc.data();
    const title = data.title || data.titleAr;
    const link = `${SITE_URL}/#/watch/${doc.id}`;
    const text = `🎬 ${title}\n\nشاهد الآن على شمس:\n${link}`;

    let allChannelsSucceeded = true;

    for (const channelId of ACTIVE_CHANNELS) {
      try {
        if (DRY_RUN) {
          log(`  🧪 اختبار فقط: ${title} → القناة ${channelId} (لم يُرسل أي منشور)`);
          allChannelsSucceeded = false;
          continue;
        }

        const result = await createPost(channelId, text);
        const payload = result && result.data && result.data.createPost;
        if (result.errors || !payload || payload.message || !payload.id) {
          allChannelsSucceeded = false;
          log(`  ❌ ${title} → لم يتأكد نجاح النشر: ${JSON.stringify(result.errors || payload || result)}`);
        } else {
          log(`  ✅ ${title} → تأكد نجاح النشر على القناة ${channelId}`);
        }
      } catch (err) {
        allChannelsSucceeded = false;
        log(`  ⚠️ خطأ بالاتصال بـ Buffer لـ "${title}": ${err.message}`);
      }
    }

    if (!DRY_RUN && allChannelsSucceeded) {
      await doc.ref.update({ sharedSocial: true });
      log(`  تم تسجيل المشاركة للمحتوى: ${doc.id}`);
    } else {
      log(`  لم يتم تغيير sharedSocial للمحتوى: ${doc.id}`);
    }
  }

  log('=== انتهى النشر ===');
  process.exit(0);
}

main().catch((err) => {
  log(`❌ خطأ عام: ${err.message}`);
  process.exit(1);
});
