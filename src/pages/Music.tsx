import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { translations } from '../i18n/translations';
import { Music as MusicIcon, Play } from 'lucide-react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FeatureGate, FeatureComingSoon } from '../components/FeatureGate';

type MusicItem = {
  id: string;
  title?: string;
  titleAr?: string;
  artist?: string;
  thumbnailUrl?: string;
  youtubeId?: string | null;
  language?: 'arabic' | 'foreign';
  status?: string;
};

export default function Music() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const [tracks, setTracks] = useState<MusicItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        const q = query(
          collection(db, 'content'),
          where('category', '==', 'music'),
          where('status', '==', 'published'),
          orderBy('createdAt', 'desc')
        );

        const snap = await getDocs(q);

        setTracks(
          snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as MusicItem[]
        );
      } catch (error) {
        console.error('Failed to load music:', error);
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    loadMusic();
  }, []);

  const renderTrack = (track: MusicItem) => (
    <div
      key={track.id}
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition group"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-shams-500/10 flex items-center justify-center flex-shrink-0">
        {track.thumbnailUrl ? (
          <img
            src={track.thumbnailUrl}
            alt={track.titleAr || track.title || ''}
            className="w-full h-full object-cover"
          />
        ) : (
          <MusicIcon size={18} className="text-shams-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">
          {track.titleAr || track.title || 'بدون عنوان'}
        </p>

        {track.artist && (
          <p className="text-sm text-gray-400 truncate">
            {track.artist}
          </p>
        )}
      </div>

      {track.youtubeId && (
        <button
          type="button"
          onClick={() =>
            window.open(
              `https://www.youtube.com/watch?v=${track.youtubeId}`,
              '_blank',
              'noopener,noreferrer'
            )
          }
          className="text-gray-500 hover:text-shams-400 transition"
          aria-label="تشغيل المقطع"
        >
          <Play size={18} />
        </button>
      )}
    </div>
  );

  return (
    <FeatureGate
      feature="music"
      fallback={<FeatureComingSoon label={t.music || 'Music'} />}
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">
          🎵 {t.music || 'Music'}
        </h1>

        {loading ? (
          <div className="shams-card text-center text-gray-400 p-8">
            جاري تحميل الأغاني...
          </div>
        ) : tracks.length === 0 ? (
          <div className="shams-card text-center text-gray-400 p-8">
            لا توجد مقاطع موسيقية منشورة حاليًا.
          </div>
        ) : (
          <>
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">
                🎵 أغاني عربية
              </h2>

              {tracks.filter(track => track.language === 'arabic').length === 0 ? (
                <div className="shams-card text-center text-gray-500 p-6">
                  لا توجد مقاطع منشورة في هذا القسم حاليًا.
                </div>
              ) : (
                <div className="shams-card space-y-2">
                  {tracks
                    .filter(track => track.language === 'arabic')
                    .map(renderTrack)}
                </div>
              )}
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">
                🌍 أغاني أجنبية
              </h2>

              {tracks.filter(track => track.language === 'foreign').length === 0 ? (
                <div className="shams-card text-center text-gray-500 p-6">
                  لا توجد مقاطع منشورة في هذا القسم حاليًا.
                </div>
              ) : (
                <div className="shams-card space-y-2">
                  {tracks
                    .filter(track => track.language === 'foreign')
                    .map(renderTrack)}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </FeatureGate>
  );
}
