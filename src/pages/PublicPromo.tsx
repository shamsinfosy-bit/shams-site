import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAppStore } from '../store';
import { Play, AlertTriangle, ExternalLink } from 'lucide-react';
import { buildYouTubeEmbedUrl } from '../services/youtube';

interface ContentDoc {
  id: string;
  title?: string;
  titleAr?: string;
  description?: string;
  category?: string;
  mediaType?: string;
  youtubeId?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  affiliateWatchUrl?: string;
  affiliateEnabled?: boolean;
  status?: string;
}

export default function PublicPromo() {
  const { id } = useParams<{ id: string }>();
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';

  const [content, setContent] = useState<ContentDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    getDoc(doc(db, 'publicContent', id))
      .then((snap) => {
        if (!snap.exists()) {
          setError(true);
          return;
        }

        const data = {
          id: snap.id,
          ...snap.data(),
        } as ContentDoc;

        if (data.status !== 'published') {
          setError(true);
          return;
        }

        setContent(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen bg-[#050912] flex items-center justify-center text-white"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div
        className="min-h-screen bg-[#050912] flex flex-col items-center justify-center gap-4 px-6 text-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <AlertTriangle size={44} className="text-yellow-400" />
        <h1 className="text-xl font-bold text-white">
          {isRTL ? 'المحتوى غير متاح' : 'Content unavailable'}
        </h1>
        <p className="text-gray-400 text-sm">
          {isRTL
            ? 'هذا المحتوى غير موجود أو لم يتم نشره بعد.'
            : 'This content does not exist or has not been published yet.'}
        </p>
      </div>
    );
  }

  const displayTitle =
    language === 'ar' && content.titleAr
      ? content.titleAr
      : content.title || '';

  const thumbnail = content.thumbnailUrl || content.thumbnail;

  return (
    <main
      className="min-h-screen bg-[#050912] text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-shams-500/10 flex items-center justify-center">
            <Play size={22} className="text-shams-400" />
          </div>
          <div>
            <p className="text-shams-400 font-bold tracking-wide">SHAMS</p>
            <p className="text-gray-500 text-xs">
              {isRTL ? 'منصة الترفيه' : 'Entertainment Platform'}
            </p>
          </div>
        </div>

        <section className="shams-card overflow-hidden">
          {thumbnail && (
            <div className="aspect-video bg-black overflow-hidden">
              <img
                src={thumbnail}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-5 sm:p-8 space-y-5">
            <div>
              <span className="inline-block bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded mb-3 capitalize">
                {content.category || 'content'}
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {displayTitle}
              </h1>
            </div>

            {content.description && (
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {content.description}
              </p>
            )}

            {content.youtubeId && (
              <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                <iframe
                  src={buildYouTubeEmbedUrl(content.youtubeId)}
                  title={displayTitle}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}

            {content.affiliateEnabled && content.affiliateWatchUrl && (
              <div className="border border-shams-500/20 bg-shams-500/5 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h2 className="font-semibold text-white">
                    {isRTL
                      ? 'شاهد عبر المنصة الرسمية'
                      : 'Watch on the official platform'}
                  </h2>
                  <p className="text-gray-500 text-xs mt-1">
                    {isRTL
                      ? 'سيتم تحويلك إلى المنصة الرسمية للمشاهدة.'
                      : 'You will be redirected to the official platform.'}
                  </p>
                </div>

                <a
                  href={content.affiliateWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shams-btn flex items-center gap-2 whitespace-nowrap"
                >
                  <ExternalLink size={16} />
                  {isRTL ? 'شاهد الآن' : 'Watch Now'}
                </a>
              </div>
            )}
          </div>
        </section>

        <p className="text-center text-gray-600 text-xs mt-8">
          © SHAMS
        </p>
      </div>
    </main>
  );
}
