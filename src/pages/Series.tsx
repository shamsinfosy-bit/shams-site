import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAppStore } from '../store';
import { translations } from '../i18n/translations';
import { Play } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../components/FeatureGate';

interface SeriesItem {
  id: string;
  title?: string;
  titleAr?: string;
  thumbnailUrl?: string;
  backdropUrl?: string;
  releaseYear?: string;
  views?: number;
}

export default function Series() {
  const language = useAppStore(s => s.language);
  const isRTL = language === 'ar';
  const t = translations[language];
  const [series, setSeries] = useState<SeriesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSeries() {
      try {
        const q = query(
          collection(db, 'content'),
          where('category', '==', 'series'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setSeries(snap.docs.map(d => ({ id: d.id, ...d.data() } as SeriesItem)));
      } catch (err) {
        console.error('Failed to load series:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSeries();
  }, []);

  return (
    <FeatureGate feature="series" fallback={<FeatureComingSoon label={t.series || 'Series'} />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">📺 {t.series || 'Series'}</h1>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && series.length === 0 && (
          <p className="text-gray-400 text-center py-20">
            {isRTL ? 'لا يوجد مسلسلات منشورة حالياً' : 'No series published yet'}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {series.map((s) => {
            const displayTitle = isRTL && s.titleAr ? s.titleAr : s.title;
            return (
              <Link key={s.id} to={`/watch/${s.id}`} className="group shams-card overflow-hidden p-0">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={s.thumbnailUrl || s.backdropUrl}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Play size={32} className="text-shams-400" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white">{displayTitle}</h3>
                  {s.releaseYear && <p className="text-sm text-gray-400">{s.releaseYear}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </FeatureGate>
  );
}
