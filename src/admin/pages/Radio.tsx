import { useState, useEffect, useRef } from 'react';
import { collection, query, where, getDocs, getCountFromServer } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAppStore } from '../../store';
import { Radio, Play, Pause, Volume2, VolumeX, Signal, ArrowLeft, ArrowRight, SkipBack, SkipForward } from 'lucide-react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import LangSwitch from '../../components/LangSwitch';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

interface RadioStation {
  id: string;
  title: string;
  titleAr: string;
  url: string;
  description?: string;
  descriptionAr?: string;
  genre?: string;
  status: string;
}

const COUNTRY_ORDER = ['SY', 'LB', 'PS', 'JO', 'IQ', 'SA', 'AE', 'QA', 'KW', 'BH', 'OM', 'YE', 'EG', 'SD', 'LY', 'TN', 'DZ', 'MA', 'GB', 'US', 'FR', 'RU'];
const stationRank = (x: any) => {
  if (x.genre === 'quran') return 1000;
  const i = COUNTRY_ORDER.indexOf(x.country);
  return i === -1 ? 500 : i;
};
const byOrder = (a: any, b: any) =>
  stationRank(a) - stationRank(b) || String(a.title).localeCompare(String(b.title));

const FOLDERS: Record<string, [string, string, string, string]> = {
  SY: ['سوريا', 'Syria', 'Сирия', 'Syrie'],
  LB: ['لبنان', 'Lebanon', 'Ливан', 'Liban'],
  JO: ['الأردن', 'Jordan', 'Иордания', 'Jordanie'],
  IQ: ['العراق', 'Iraq', 'Ирак', 'Irak'],
  SA: ['السعودية', 'Saudi Arabia', 'Саудовская Аравия', 'Arabie saoudite'],
  AE: ['الإمارات', 'United Arab Emirates', 'ОАЭ', 'Émirats arabes unis'],
  QA: ['قطر', 'Qatar', 'Катар', 'Qatar'],
  KW: ['الكويت', 'Kuwait', 'Кувейт', 'Koweït'],
  EG: ['مصر', 'Egypt', 'Египет', 'Égypte'],
  MA: ['المغرب', 'Morocco', 'Марокко', 'Maroc'],
  PS: ['فلسطين', 'Palestine', 'Палестина', 'Palestine'],
  BH: ['البحرين', 'Bahrain', 'Бахрейн', 'Bahreïn'],
  OM: ['عُمان', 'Oman', 'Оман', 'Oman'],
  YE: ['اليمن', 'Yemen', 'Йемен', 'Yémen'],
  SD: ['السودان', 'Sudan', 'Судан', 'Soudan'],
  LY: ['ليبيا', 'Libya', 'Ливия', 'Libye'],
  TN: ['تونس', 'Tunisia', 'Тунис', 'Tunisie'],
  DZ: ['الجزائر', 'Algeria', 'Алжир', 'Algérie'],
  GB: ['بريطانيا', 'United Kingdom', 'Великобритания', 'Royaume-Uni'],
  US: ['أمريكا', 'United States', 'США', 'États-Unis'],
  FR: ['فرنسا', 'France', 'Франция', 'France'],
  RU: ['روسيا', 'Russia', 'Россия', 'Russie'],
  quran: ['القرآن الكريم', 'Holy Quran', 'Священный Коран', 'Saint Coran'],
};
const flagOf = (code: string) =>
  String.fromCodePoint(...Array.from(code).map((ch) => 127397 + ch.charCodeAt(0)));

const starPoints = (cx: number, cy: number, R: number, r: number) =>
  Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const d = i % 2 === 0 ? R : r;
    return `${(cx + d * Math.cos(a)).toFixed(2)},${(cy + d * Math.sin(a)).toFixed(2)}`;
  }).join(' ');

const FlagIcon = ({ k, size }: { k: string; size: 'lg' | 'sm' }) => {
  if (k === 'SY') {
    return (
      <svg viewBox="0 0 90 60" className={`${size === 'lg' ? 'w-16' : 'w-10'} h-auto rounded-sm shadow`} role="img" aria-label="Syria">
        <rect width="90" height="20" fill="#CE1126" />
        <rect y="20" width="90" height="20" fill="#FFFFFF" />
        <rect y="40" width="90" height="20" fill="#000000" />
        <polygon fill="#007A3D" points={starPoints(30, 30, 7, 2.8)} />
        <polygon fill="#007A3D" points={starPoints(60, 30, 7, 2.8)} />
      </svg>
    );
  }
  const emoji = k === 'quran' ? '🕌' : k === 'other' ? '🌍' : flagOf(k);
  return <span className={`${size === 'lg' ? 'text-5xl' : 'text-3xl'} leading-none`}>{emoji}</span>;
};

export default function RadioPage() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  const tr = (ar: string, en: string, ru: string, fr: string) =>
    language === 'ar' ? ar : language === 'ru' ? ru : language === 'fr' ? fr : en;
  const nameOf = (st: any) =>
    (language === 'ar' ? st.titleAr : language === 'ru' ? st.titleRu : language === 'fr' ? st.titleFr : '') || st.title;
  const [loaded, setLoaded] = useState<Record<string, RadioStation[]>>({});
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const folder = params.get('c');
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [current, setCurrent] = useState<RadioStation | null>(null);
  const [playlist, setPlaylist] = useState<RadioStation[]>([]);
  const openFolder = (k: string) => setParams({ c: k });
  const closeFolder = () => (location.key !== 'default' ? navigate(-1) : setParams({}, { replace: true }));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantPlayRef = useRef(false);
  const retryRef = useRef(0);
  const activeUrlRef = useRef('');
  const retryTimerRef = useRef<number | null>(null);
  const waitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const keys = [...COUNTRY_ORDER, 'other', 'quran'];
    Promise.all(keys.map(async (k) => {
      const q = query(collection(db, 'content'), where('category', '==', 'radio'), where('status', '==', 'published'), where('folder', '==', k));
      const r = await getCountFromServer(q);
      return [k, r.data().count] as [string, number];
    })).then((rows) => {
      if (cancelled) return;
      const c: Record<string, number> = {};
      rows.forEach(([k, n]) => { if (n > 0) c[k] = n; });
      setCounts(c);
      setLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setCounts({});
      setError(tr('تعذّر تحميل المحطات', 'Could not load stations', 'Не удалось загрузить станции', 'Impossible de charger les stations'));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!folder || loaded[folder]) return;
    let cancelled = false;
    const q = query(collection(db, 'content'), where('category', '==', 'radio'), where('status', '==', 'published'), where('folder', '==', folder));
    getDocs(q).then((snap) => {
      if (cancelled) return;
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as RadioStation)).sort(byOrder);
      setLoaded((p) => ({ ...p, [folder]: data }));
    }).catch(() => {
      if (cancelled) return;
      setError(tr('تعذّر تحميل المحطات', 'Could not load stations', 'Не удалось загрузить станции', 'Impossible de charger les stations'));
      setLoaded((p) => ({ ...p, [folder]: [] }));
    });
    return () => { cancelled = true; };
  }, [folder]);

  function clearTimers() {
    if (retryTimerRef.current) { window.clearTimeout(retryTimerRef.current); retryTimerRef.current = null; }
    if (waitTimerRef.current) { window.clearTimeout(waitTimerRef.current); waitTimerRef.current = null; }
  }

  // play() يرفض بـ AbortError عند تغيير المصدر أو الإيقاف، وهذا ليس فشل اتصال
  function safePlay() {
    const a = audioRef.current;
    if (!a) return;
    a.play().catch((e) => {
      if (e && e.name === 'AbortError') return;
      reconnect();
    });
  }

  function reconnect() {
    if (!wantPlayRef.current || !audioRef.current || !activeUrlRef.current) return;
    if (retryTimerRef.current) return; // محاولة مجدولة بالفعل: تجاهل الاستدعاء المكرر
    if (retryRef.current >= 5) {
      setError(tr('انقطع البث. اضغط تشغيل للمحاولة من جديد', 'Stream lost. Press play to retry', 'Поток прерван. Нажмите, чтобы повторить', 'Flux interrompu. Appuyez pour réessayer'));
      setPlaying(false);
      wantPlayRef.current = false;
      return;
    }
    retryRef.current += 1;
    setError(tr('جارٍ إعادة الاتصال...', 'Reconnecting...', 'Повторное подключение...', 'Reconnexion...'));
    retryTimerRef.current = window.setTimeout(() => {
      retryTimerRef.current = null;
      const a = audioRef.current;
      if (!a || !wantPlayRef.current) return;
      a.src = activeUrlRef.current;
      safePlay();
    }, Math.min(2000 * retryRef.current, 8000));
  }

  function playStation(station: RadioStation, list?: RadioStation[]) {
    if (!station.url) { setError(tr('المحطة غير متاحة', 'Station not available', 'Станция недоступна', 'Station indisponible')); return; }
    setError(null);
    clearTimers();
    activeUrlRef.current = station.url;
    wantPlayRef.current = true;
    retryRef.current = 0;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = station.url;
      safePlay();
    }
    setActiveId(station.id);
    setCurrent(station);
    if (list) setPlaylist(list);
    setPlaying(true);
  }

  function pauseStation() {
    wantPlayRef.current = false;
    clearTimers();
    audioRef.current?.pause();
    setPlaying(false);
  }

  function resumeStation() {
    wantPlayRef.current = true;
    retryRef.current = 0;
    setError(null);
    clearTimers();
    safePlay();
    setPlaying(true);
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) pauseStation(); else resumeStation();
  }

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  }

  const activeStation = current;
  const activeTitle = activeStation ? nameOf(activeStation) : null;
  const canStep = playlist.length > 1;
  function step(dir: 1 | -1) {
    if (!activeStation || playlist.length < 2) return;
    const idx = playlist.findIndex((s) => s.id === activeStation.id);
    const next = playlist[(idx + dir + playlist.length) % playlist.length];
    playStation(next);
  }

  // مراجع حديثة دائماً لاستخدامها داخل مستمعات الأحداث
  const reconnectRef = useRef(reconnect);
  reconnectRef.current = reconnect;
  const stepRef = useRef(step);
  stepRef.current = step;
  const pauseRef = useRef(pauseStation);
  pauseRef.current = pauseStation;
  const resumeRef = useRef(resumeStation);
  resumeRef.current = resumeStation;

  useEffect(() => {
    const onOnline = () => {
      if (wantPlayRef.current) { retryRef.current = 0; reconnectRef.current(); }
    };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  // معالجات Media Session: تُسجَّل مرة واحدة وتُزال عند المغادرة
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    const set = (a: MediaSessionAction, h: MediaSessionActionHandler | null) => {
      try { ms.setActionHandler(a, h); } catch { /* غير مدعوم */ }
    };
    set('play', () => resumeRef.current());
    set('pause', () => pauseRef.current());
    set('stop', () => pauseRef.current());
    set('previoustrack', () => stepRef.current(-1));
    set('nexttrack', () => stepRef.current(1));
    return () => {
      (['play', 'pause', 'stop', 'previoustrack', 'nexttrack'] as MediaSessionAction[]).forEach((a) => set(a, null));
    };
  }, []);

  // بيانات الوسائط وحالة التشغيل
  useEffect(() => {
    if (!('mediaSession' in navigator) || !activeStation) return;
    const thumb = (activeStation as any).thumbnailUrl as string | undefined;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: activeTitle || 'Shams Radio',
      artist: 'Shams Radio',
      artwork: thumb ? [{ src: thumb, sizes: '96x96' }] : [],
    });
    navigator.mediaSession.playbackState = playing ? 'playing' : 'paused';
  }, [activeId, activeTitle, playing]);

  // تنظيف عند مغادرة الصفحة
  useEffect(() => {
    return () => {
      wantPlayRef.current = false;
      clearTimers();
      const a = audioRef.current;
      if (a) { a.pause(); a.removeAttribute('src'); a.load(); }
      if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'none';
    };
  }, []);

  const folderKeys = [...COUNTRY_ORDER, 'other', 'quran'].filter((k) => counts[k]);
  const folderName = (k: string) => {
    const f = FOLDERS[k];
    return f ? tr(f[0], f[1], f[2], f[3]) : tr('أخرى', 'Other', 'Другие', 'Autres');
  };
  const stationsLabel = tr('محطة', 'stations', 'станций', 'stations');
  const genreName = (g?: string) =>
    g === 'quran' ? tr('قرآن', 'Quran', 'Коран', 'Coran')
    : g === 'news' ? tr('أخبار', 'News', 'Новости', 'Actualités')
    : g === 'sports' ? tr('رياضة', 'Sports', 'Спорт', 'Sport')
    : tr('موسيقى', 'Music', 'Музыка', 'Musique');

  const PrevIcon = isRTL ? SkipForward : SkipBack;
  const NextIcon = isRTL ? SkipBack : SkipForward;

  return (
    <FeatureGate feature="radio" fallback={<FeatureComingSoon label={tr('الراديو', 'Radio', 'Радио', 'Radio')} />}>
      <div className="space-y-6 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex justify-end"><LangSwitch /></div>
        <div className="flex items-center gap-3">
          <Radio size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{tr('الراديو المباشر', 'Live Radio', 'Прямой эфир', 'Radio en direct')}</h1>
          <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            <Signal size={10} className="animate-pulse" />
            {tr('مباشر', 'LIVE', 'В ЭФИРЕ', 'EN DIRECT')}
          </span>
        </div>

        {activeStation && (
          <div className="shams-card flex flex-wrap items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-shams-500/10 border border-shams-500/30 flex items-center justify-center flex-shrink-0">
              <Radio size={24} className="text-shams-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold truncate">{activeTitle}</p>
              <p className="text-xs text-shams-400">{tr('يُبث الآن', 'Now Playing', 'Сейчас в эфире', 'En cours de lecture')}</p>
            </div>
            <div className="flex w-full items-center justify-center gap-6">
              <button onClick={toggleMute} className="text-gray-400 hover:text-white transition" aria-label="mute">
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button
                onClick={() => step(-1)}
                disabled={!canStep}
                aria-label={tr('المحطة السابقة', 'Previous station', 'Предыдущая станция', 'Station précédente')}
                className="text-gray-400 hover:text-white transition disabled:opacity-30"
              >
                <PrevIcon size={30} />
              </button>
              <button onClick={togglePlay} className="w-12 h-12 bg-shams-500 rounded-full flex items-center justify-center hover:bg-shams-400 transition" aria-label="play/pause">
                {playing ? <Pause size={22} className="text-black" /> : <Play size={22} className="text-black" />}
              </button>
              <button
                onClick={() => step(1)}
                disabled={!canStep}
                aria-label={tr('المحطة التالية', 'Next station', 'Следующая станция', 'Station suivante')}
                className="text-gray-400 hover:text-white transition disabled:opacity-30"
              >
                <NextIcon size={30} />
              </button>
            </div>
          </div>
        )}

        {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">{error}</div>}

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : folder !== null && !loaded[folder] ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : folder === null ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folderKeys.map((key) => (
              <button
                key={key}
                onClick={() => openFolder(key)}
                className="shams-card flex flex-col items-center justify-center gap-2 py-6 transition-all hover:border-shams-500/50"
              >
                <FlagIcon k={key} size="lg" />
                <span className="text-white font-semibold text-center">{folderName(key)}</span>
                <span className="text-xs text-gray-500">{counts[key]} {stationsLabel}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={closeFolder}
                className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition"
              >
                {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                {tr('رجوع', 'Back', 'Назад', 'Retour')}
              </button>
              <FlagIcon k={folder} size="sm" />
              <h2 className="text-xl font-bold text-white">{folderName(folder)}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loaded[folder].map((station) => {
                const sTitle = nameOf(station);
                const cc = (station as any).country as string;
                const sDesc = FOLDERS[cc]
                  ? folderName(cc) + ' • ' + genreName(station.genre)
                  : isRTL && station.descriptionAr ? station.descriptionAr : station.description;
                const isActive = activeId === station.id;
                return (
                  <button key={station.id} onClick={() => playStation(station, loaded[folder])}
                    className={`shams-card text-start w-full transition-all ${isActive ? 'border-shams-500/50 bg-shams-500/5' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-shams-500/20 border border-shams-500/40' : 'bg-gray-800'}`}>
                        {isActive && playing ? <Pause size={18} className="text-shams-400" /> : <Play size={18} className={isActive ? 'text-shams-400' : 'text-gray-400'} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${isActive ? 'text-shams-400' : 'text-white'}`}>{sTitle}</p>
                        {sDesc && <p className="text-xs text-gray-500 truncate mt-0.5">{sDesc}</p>}
                      </div>
                      {isActive && playing && (
                        <div className="flex items-end gap-0.5">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-1 bg-shams-400 rounded-full animate-pulse" style={{ height: `${8 + i * 4}px` }} />
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <audio
          ref={audioRef}
          onError={() => reconnect()}
          onPlaying={() => {
            retryRef.current = 0;
            setError(null);
            setPlaying(true);
            if (waitTimerRef.current) { window.clearTimeout(waitTimerRef.current); waitTimerRef.current = null; }
          }}
          onWaiting={() => {
            if (!wantPlayRef.current) return;
            if (waitTimerRef.current) window.clearTimeout(waitTimerRef.current);
            waitTimerRef.current = window.setTimeout(() => { waitTimerRef.current = null; reconnect(); }, 10000);
          }}
        />
      </div>
    </FeatureGate>
  );
}
