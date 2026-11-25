import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAppStore } from '../store';
import { translations } from '../i18n/translations';
import { Play } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../components/FeatureGate';

interface MovieItem {
  id: string;
  title?: string;
  titleAr?: string;
  thumbnailUrl?: string;
  backdropUrl?: string;
  releaseYear?: string;
  views?: number;
}

export default function Movies() {
  const language = useAppStore(s => s.language);
  const isRTL = language === 'ar';
  const t = translations[language];
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const q = query(
          collection(db, 'content'),
          where('status', '==', 'published'),
          where('category', '==', 'movies'),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setMovies(snap.docs.map(d => ({ id: d.id, ...d.data() } as MovieItem)));
      } catch (err) {
        console.error('Failed to load movies:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMovies();
  }, []);

  return (
    <FeatureGate feature="movies" fallback={<FeatureComingSoon label={t.movies || 'Movies'} />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">🎬 {t.movies || 'Movies'}</h1>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && movies.length === 0 && (
          <p className="text-gray-400 text-center py-20">
            {isRTL ? 'لا يوجد أفلام منشورة حالياً' : 'No movies published yet'}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((m) => {
            const displayTitle = isRTL && m.titleAr ? m.titleAr : m.title;
            return (
              <Link key={m.id} to={`/watch/${m.id}`} className="group shams-card overflow-hidden p-0">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={m.thumbnailUrl || m.backdropUrl}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Play size={32} className="text-shams-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white">{displayTitle}</h3>
                  {m.releaseYear && <p className="text-sm text-gray-400">{m.releaseYear}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </FeatureGate>
  );
}
