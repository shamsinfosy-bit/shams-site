// SHAMS_PROMO_DIAGNOSTIC_START
console.log('[SHAMS PROMO] بدأ تنفيذ main.ts');
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const appEl = document.getElementById('app');

function showMessage(message: string) {
  if (!appEl) return;
  const box = document.createElement('div');
  box.className = 'message';
  box.textContent = message;
  appEl.replaceChildren(box);
}

function safeImageUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

function safeYouTubeId(value: unknown): string {
  if (typeof value !== 'string') return '';
  return /^[a-zA-Z0-9_-]{11}$/.test(value) ? value : '';
}

async function loadContent() {
  const match = window.location.pathname.match(/^\/p\/([^/]+)\/?$/);
  const id = match?.[1];

  if (!id || !appEl) {
    showMessage('رابط المحتوى غير صالح.');
    return;
  }

  try {
    const snapshot = await Promise.race([
      getDoc(doc(db, 'publicContent', id)),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('FIRESTORE_TIMEOUT_12S')), 12000)
      ),
    ]);

    if (!snapshot.exists()) {
      showMessage('تشخيص: المتصفح لا يجد المستند في publicContent.');
      return;
    }

    const data = snapshot.data();

    if (data.status !== 'published') {
      showMessage('تشخيص: حالة المستند هي ' + String(data.status) + ' وليست published.');
      return;
    }

    const title = String(data.titleAr || data.title || 'SHAMS');
    const originalTitle = String(data.title || '');
    const description = String(data.description || '');
    const image = safeImageUrl(data.thumbnailUrl || data.thumbnail);
    const youtubeId = safeYouTubeId(data.youtubeId);
    const affiliateUrl =
      data.affiliateEnabled === true &&
      typeof data.affiliateWatchUrl === 'string' &&
      safeImageUrl(data.affiliateWatchUrl).startsWith('https://')
        ? safeImageUrl(data.affiliateWatchUrl)
        : '';

    const main = document.createElement('main');
    main.className = 'promo';

    const logo = document.createElement('a');
    logo.className = 'shams-logo';
    logo.href = 'https://shams-1db5a.web.app/';
    logo.textContent = '☀ SHAMS | شمس';
    logo.setAttribute('aria-label', 'الانتقال إلى موقع شمس');
    logo.style.cssText = 'display:block;text-align:center;font-size:1.6rem;font-weight:800;text-decoration:none;color:inherit;padding:16px;margin-bottom:12px';
    main.appendChild(logo);

    if (image) {
      const poster = document.createElement('img');
      poster.className = 'poster';
      poster.src = image;
      poster.alt = title;
      poster.loading = 'eager';
      main.appendChild(poster);
    }

    const heading = document.createElement('h1');
    heading.textContent = title;
    main.appendChild(heading);

    if (originalTitle && originalTitle !== title) {
      const original = document.createElement('div');
      original.className = 'original-title';
      original.textContent = originalTitle;
      main.appendChild(original);
    }

    if (description) {
      const desc = document.createElement('p');
      desc.className = 'description';
      desc.textContent = description;
      main.appendChild(desc);
    }

    if (youtubeId) {
      const trailer = document.createElement('div');
      trailer.className = 'trailer';

      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}`;
      iframe.title = `التريلر: ${title}`;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;

      trailer.appendChild(iframe);
      main.appendChild(trailer);
    }

    if (affiliateUrl) {
      const watch = document.createElement('a');
      watch.className = 'watch';
      watch.href = affiliateUrl;
      watch.target = '_blank';
      watch.rel = 'noopener noreferrer sponsored';
      watch.textContent = 'شاهد الآن';

      const note = document.createElement('p');
      note.className = 'official-note';
      note.textContent = 'انتقل إلى المنصة عبر الرابط المتاح.';

      main.append(watch, note);
    }

    appEl.replaceChildren(main);
  } catch (error) {
    console.error('تعذر تحميل صفحة SHAMS العامة:', error);

    const message =
      error instanceof Error && error.message === 'FIRESTORE_TIMEOUT_12S'
        ? 'انتهت مهلة الاتصال بـ Firestore بعد 12 ثانية.'
        : error instanceof Error
          ? `فشل تحميل المحتوى: ${error.message}`
          : 'فشل تحميل المحتوى بسبب خطأ غير معروف.';

    showMessage(message);
  }
}

loadContent();
