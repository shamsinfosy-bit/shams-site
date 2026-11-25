/**
 * سكريبت استيراد الأفلام والمسلسلات من TMDB إلى Firestore
 * الاستخدام: node import-tmdb.js
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const axios = require('axios');
const path = require('path');

// ========== الإعدادات ==========
const TMDB_API_KEY = '4155609f62be343856170c1bd7cde934'; // ضع مفتاح API Key (v3 auth) هنا
const SERVICE_ACCOUNT_PATH = path.join(__dirname, 'service-account.json');

const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

const MOVIES_INTL_PAGES = 2;
const MOVIES_ARABIC_PAGES = 2;
const SERIES_PAGES = 2;

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

async function fetchPopularMovies(page, language = 'ar', region = null) {
  const params = { api_key: TMDB_API_KEY, language, page };
  if (region) params.region = region;
  const { data } = await axios.get(`${TMDB_BASE}/movie/popular`, { params });
  return data.results;
}

async function fetchArabicMovies(page) {
  const params = {
    api_key: TMDB_API_KEY,
    language: 'ar',
    page,
    with_original_language: 'ar',
    sort_by: 'popularity.desc',
  };
  const { data } = await axios.get(`${TMDB_BASE}/discover/movie`, { params });
  return data.results;
}

async function fetchPopularSeries(page, language = 'ar') {
  const params = {
    api_key: TMDB_API_KEY,
    language,
    page,
  };
  const { data } = await axios.get(`${TMDB_BASE}/tv/popular`, { params });
  return data.results;
}

async function fetchEnglishTitle(id, type) {
  try {
    const params = { api_key: TMDB_API_KEY, language: 'en-US' };
    const { data } = await axios.get(`${TMDB_BASE}/${type}/${id}`, { params });
    return type === 'movie' ? data.title : data.name;
  } catch {
    return null;
  }
}

function mapMovieToContent(movie, titleEn, category, language = 'foreign') {
  return {
    title: titleEn || movie.title || movie.original_title || '',
    titleAr: movie.title || '',
    category,
    language,
    description: movie.overview || '',
    mediaType: 'video',
    url: '',
    youtubeId: null,
    thumbnailUrl: movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : null,
    backdropUrl: movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null,
    rating: movie.vote_average || 0,
    releaseYear: movie.release_date ? movie.release_date.slice(0, 4) : null,
    tmdbId: movie.id,
    source: 'tmdb',
    views: 0,
    status: 'draft',
    uploadedBy: 'tmdb-import',
    createdAt: FieldValue.serverTimestamp(),
  };
}

function mapSeriesToContent(serie, titleEn, language = 'foreign') {
  return {
    title: titleEn || serie.name || serie.original_name || '',
    titleAr: serie.name || '',
    category: 'series',
    language,
    description: serie.overview || '',
    mediaType: 'video',
    url: '',
    youtubeId: null,
    thumbnailUrl: serie.poster_path ? `${IMAGE_BASE}${serie.poster_path}` : null,
    backdropUrl: serie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${serie.backdrop_path}` : null,
    rating: serie.vote_average || 0,
    releaseYear: serie.first_air_date ? serie.first_air_date.slice(0, 4) : null,
    tmdbId: serie.id,
    source: 'tmdb',
    views: 0,
    status: 'draft',
    uploadedBy: 'tmdb-import',
    createdAt: FieldValue.serverTimestamp(),
  };
}

async function alreadyImported(tmdbId, category) {
  const snap = await db.collection('content')
    .where('tmdbId', '==', tmdbId)
    .where('category', '==', category)
    .limit(1)
    .get();
  return !snap.empty;
}

async function saveItem(data) {
  const exists = await alreadyImported(data.tmdbId, data.category);
  if (exists) {
    console.log(`  ⏭️  متجاوز (موجود مسبقاً): ${data.title}`);
    return false;
  }
  await db.collection('content').add(data);
  console.log(`  ✅ ${data.title}`);
  return true;
}

async function main() {

  let totalAdded = 0;

  console.log('\n🎬 جاري استيراد الأفلام العالمية...');
  for (let page = 1; page <= MOVIES_INTL_PAGES; page++) {
    const movies = await fetchPopularMovies(page);
    for (const movie of movies) {
      const titleEn = await fetchEnglishTitle(movie.id, 'movie');
      const data = mapMovieToContent(movie, titleEn, 'movies', 'foreign');
      const added = await saveItem(data);
      if (added) totalAdded++;
    }
  }

  console.log('\n🎬 جاري استيراد الأفلام العربية...');
  for (let page = 1; page <= MOVIES_ARABIC_PAGES; page++) {
    const movies = await fetchArabicMovies(page);
    for (const movie of movies) {
      const titleEn = await fetchEnglishTitle(movie.id, 'movie');
      const data = mapMovieToContent(movie, titleEn, 'movies', 'arabic');
      const added = await saveItem(data);
      if (added) totalAdded++;
    }
  }

  console.log('\n📺 جاري استيراد المسلسلات العربية...');
  for (let page = 1; page <= SERIES_PAGES; page++) {
    const series = await fetchPopularSeries(page, 'ar');
    for (const serie of series) {
      const titleEn = await fetchEnglishTitle(serie.id, 'tv');
      const data = mapSeriesToContent(serie, titleEn, 'arabic');
      const added = await saveItem(data);
      if (added) totalAdded++;
    }
  }

  console.log('\n📺 جاري استيراد المسلسلات الأجنبية...');
  for (let page = 1; page <= SERIES_PAGES; page++) {
    const series = await fetchPopularSeries(page, 'en-US');
    for (const serie of series) {
      const titleEn = await fetchEnglishTitle(serie.id, 'tv');
      const data = mapSeriesToContent(serie, titleEn, 'foreign');
      const added = await saveItem(data);
      if (added) totalAdded++;
    }
  }

  console.log(`\n🎉 انتهى الاستيراد! تم إضافة ${totalAdded} عنصر جديد بحالة "draft".`);
  console.log('افتح لوحة التحكم > Content لإضافة روابط يوتيوب ونشرها.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ حدث خطأ:', err.message);
  process.exit(1);
});
