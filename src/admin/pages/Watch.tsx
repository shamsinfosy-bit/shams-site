import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAppStore } from '../../store';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, AlertTriangle } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

interface ContentDoc {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  description: string;
  mediaType: string;
  url: string;
  thumbnail?: string;
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

  // حالة المشغّل
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // تحميل المحتوى
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

        // تحميل المحتوى ذي الصلة
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

        // زيادة عداد المشاهدات
        updateDoc(doc(db, 'content', id), { views: increment(1) }).catch(() => {});
      })
      .catch(() => setError(isRTL ? 'حدث خطأ في التحميل' : 'Failed to load content'))
      .finally(() => setLoading(false));
  }, [id, isRTL]);

  // إخفاء تلقائي للأدوات
  function handleMouseMove() {
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }

  function togglePlay() {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); setShowControls(false); }
  }

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  }

  function handleTimeUpdate() {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    if (!videoRef.current) return;
    const val = Number(e.target.value);
    videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
    setProgress(val);
  }

  function handleFullscreen() {
    videoRef.current?.requestFullscreen?.();
  }

  function skip(seconds: number) {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, videoRef.current.duration));
  }

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

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

        {/* زر الرجوع */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
        >
          <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
          {isRTL ? 'رجوع' : 'Back'}
        </button>

        {/* مشغّل الفيديو */}
        {content.mediaType === 'video' && (
          <div
            className="relative bg-black rounded-xl overflow-hidden aspect-video group"
            onMouseMove={handleMouseMove}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={content.url}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
              onEnded={() => { setPlaying(false); setShowControls(true); }}
            />

            {/* طبقة التحكم */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${showControls || !playing ? 'opacity-100' : 'opacity-0'}`}>

              {/* أيقونة Play وسط الشاشة */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-shams-500/90 rounded-full flex items-center justify-center">
                    <Play size={28} className="text-black ml-1" fill="black" />
                  </div>
                </div>
              )}

              {/* أدوات التحكم السفلية */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2" onClick={(e) => e.stopPropagation()}>
                {/* شريط التقدم */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 accent-shams-400 cursor-pointer"
                />

                {/* أزرار التحكم */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => skip(-10)} className="text-white hover:text-shams-400 transition">
                      <SkipBack size={20} />
                    </button>
                    <button onClick={togglePlay} className="text-white hover:text-shams-400 transition">
                      {playing ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button onClick={() => skip(10)} className="text-white hover:text-shams-400 transition">
                      <SkipForward size={20} />
                    </button>
                    <button onClick={toggleMute} className="text-white hover:text-shams-400 transition">
                      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <span className="text-white text-xs font-mono">
                      {formatTime((progress / 100) * duration)} / {formatTime(duration)}
                    </span>
                  </div>
                  <button onClick={handleFullscreen} className="text-white hover:text-shams-400 transition">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* مشغّل الصوت */}
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

        {/* معلومات المحتوى */}
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

        {/* المحتوى ذو الصلة */}
        {related.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              {isRTL ? 'محتوى مشابه' : 'Related Content'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {related.map((item) => {
                const itemTitle = language === 'ar' && item.titleAr ? item.titleAr : item.title;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(`/watch/${item.id}`)}
                    className="text-left group"
                  >
                    <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden mb-2 relative">
                      {item.thumbnail ? (
                        <img src={item.thumbnail} alt={itemTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
