import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAppStore } from '../../store';
import { ArrowLeft, Play, Volume2, AlertTriangle } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';
import { buildYouTubeEmbedUrl } from '../../services/youtube';

interface ContentDoc {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  description: string;
  mediaType: string;
  url: string;
  youtubeId?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  officialWatchUrl?: string;
  affiliateWatchUrl?: string;
  affiliateNetwork?: string;
  affiliateEnabled?: boolean;
  duration?: number;
  views?: number;
  status: string;
  uploadedBy: string;
  createdAt: any;
}

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';

  const [content, setContent] = useState<ContentDoc | null>(null);
  const [related, setRelated] = useState<ContentDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    getDoc(doc(db, 'content', id))
      .then(async (snap) => {
        if (!snap.exists()) {
          setError(isRTL ? 'المحتوى غير موجود' : 'Content not found');
          return;
        }
        const data = { id: snap.id, ...snap.data() } as ContentDoc;
        if (data.status !== 'published') {
          setError(isRTL ? 'هذا المحتوى غير متاح حالياً' : 'This content is not available');
          return;
        }
        setContent(data);

        const q = query(
          collection(db, 'content'),
          where('category', '==', data.category),
          where('status', '==', 'published'),
          limit(6)
        );
        const relSnap = await getDocs(q);
        setRelated(
          relSnap.docs
            .map((d) => ({ id: d.id, ...d.data() } as ContentDoc))
            .filter((d) => d.id !== id)
            .slice(0, 5)
        );

        updateDoc(doc(db, 'content', id), { views: increment(1) }).catch(() => {});
      })
      .catch(() => setError(isRTL ? 'حدث خطأ في التحميل' : 'Failed to load content'))
      .finally(() => setLoading(false));
  }, [id, isRTL]);

  const displayTitle = language === 'ar' && content?.titleAr ? content.titleAr : content?.title;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <AlertTriangle size={40} className="text-yellow-400" />
        <p className="text-gray-400">{error}</p>
        <button onClick={() => navigate(-1)} className="shams-btn-ghost flex items-center gap-2">
          <ArrowLeft size={16} />
          {isRTL ? 'رجوع' : 'Go Back'}
        </button>
      </div>
    );
  }

  if (!content) return null;

  return (
    <FeatureGate feature="watch" fallback={<FeatureComingSoon label={isRTL ? 'المشاهدة' : 'Watch'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
        >
          <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
          {isRTL ? 'رجوع' : 'Back'}
        </button>

        {content.mediaType === 'video' && content.youtubeId && (
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

        {content.mediaType === 'video' && !content.youtubeId && content.url && (
          <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
            <video src={content.url} controls className="w-full h-full object-contain" />
          </div>
        )}

        {content.mediaType === 'audio' && (
          <div className="shams-card flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-shams-500/10 flex items-center justify-center flex-shrink-0">
              <Volume2 size={28} className="text-shams-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium mb-2">{displayTitle}</p>
              <audio src={content.url} controls className="w-full h-8" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{displayTitle}</h1>
          {content.description && (
            <p className="text-gray-400 text-sm leading-relaxed">{content.description}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="capitalize bg-gray-800 px-2 py-1 rounded">{content.category}</span>
            {content.views !== undefined && (
              <span>{content.views.toLocaleString()} {isRTL ? 'مشاهدة' : 'views'}</span>
            )}
          </div>
        </div>

        {content.affiliateEnabled && content.affiliateWatchUrl && (
          <div className="shams-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold">
                {isRTL ? 'شاهد عبر المنصة الرسمية' : 'Watch on the official platform'}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {isRTL
                  ? 'سيتم تحويلك إلى المنصة الرسمية للمشاهدة.'
                  : 'You will be redirected to the official platform to watch.'}
              </p>
            </div>

            <a
              href={content.affiliateWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shams-btn flex items-center gap-2 whitespace-nowrap"
            >
              <Play size={16} />
              {isRTL ? 'شاهد الآن' : 'Watch Now'}
            </a>
          </div>
        )}

        {related.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              {isRTL ? 'محتوى مشابه' : 'Related Content'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {related.map((item) => {
                const itemTitle = language === 'ar' && item.titleAr ? item.titleAr : item.title;
                const itemThumb = item.thumbnailUrl || item.thumbnail;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(`/watch/${item.id}`)}
                    className="text-left group"
                  >
                    <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-2 relative">
                      {itemThumb ? (
                        <img src={itemThumb} alt={itemTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play size={20} className="text-gray-600" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-300 group-hover:text-white transition truncate">{itemTitle}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </FeatureGate>
  );
}
