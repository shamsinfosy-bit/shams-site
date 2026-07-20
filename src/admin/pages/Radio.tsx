import { useState, useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAppStore } from '../../store';
import { Radio, Play, Pause, Volume2, VolumeX, Signal } from 'lucide-react';
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

const FALLBACK: RadioStation[] = [
  { id: 'd1', title: 'SHAMS Music', titleAr: 'شمس موسيقى', url: '', description: 'Coming soon', descriptionAr: 'قريباً', genre: 'music', status: 'published' },
  { id: 'd2', title: 'SHAMS News', titleAr: 'شمس أخبار', url: '', description: 'Coming soon', descriptionAr: 'قريباً', genre: 'news', status: 'published' },
];

export default function RadioPage() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'content'), where('category', '==', 'radio'), where('status', '==', 'published'));
    const unsub = onSnapshot(q,
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as RadioStation));
        setStations(data.length > 0 ? data : FALLBACK);
        setLoading(false);
      },
      () => { setStations(FALLBACK); setLoading(false); }
    );
    return () => unsub();
  }, []);

  function playStation(station: RadioStation) {
    if (!station.url) { setError(isRTL ? 'المحطة غير متاحة' : 'Station not available'); return; }
    setError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = station.url;
      audioRef.current.play().catch(() => setError(isRTL ? 'فشل التشغيل' : 'Playback failed'));
    }
    setActiveId(station.id);
    setPlaying(true);
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  }

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  }

  const activeStation = stations.find((s) => s.id === activeId);
  const activeTitle = activeStation ? (isRTL && activeStation.titleAr ? activeStation.titleAr : activeStation.title) : null;

  return (
    <FeatureGate feature="radio" fallback={<FeatureComingSoon label={isRTL ? 'الراديو' : 'Radio'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-3">
          <Radio size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'الراديو المباشر' : 'Live Radio'}</h1>
          <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            <Signal size={10} className="animate-pulse" />
            {isRTL ? 'مباشر' : 'LIVE'}
          </span>
        </div>

        {activeStation && (
          <div className="shams-card flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-shams-500/10 border border-shams-500/30 flex items-center justify-center flex-shrink-0">
              <Radio size={24} className="text-shams-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold truncate">{activeTitle}</p>
              <p className="text-xs text-shams-400">{isRTL ? 'يُبث الآن' : 'Now Playing'}</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleMute} className="text-gray-400 hover:text-white transition">
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <button onClick={togglePlay} className="w-10 h-10 bg-shams-500 rounded-full flex items-center justify-center hover:bg-shams-400 transition">
                {playing ? <Pause size={18} className="text-black" /> : <Play size={18} className="text-black" />}
              </button>
            </div>
          </div>
        )}

        {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">{error}</div>}

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stations.map((station) => {
              const sTitle = isRTL && station.titleAr ? station.titleAr : station.title;
              const sDesc = isRTL && station.descriptionAr ? station.descriptionAr : station.description;
              const isActive = activeId === station.id;
              return (
                <button key={station.id} onClick={() => playStation(station)}
                  className={`shams-card text-left w-full transition-all ${isActive ? 'border-shams-500/50 bg-shams-500/5' : ''}`}>
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
                        {[1,2,3].map((i) => (
                          <div key={i} className="w-1 bg-shams-400 rounded-full animate-pulse" style={{ height: `${8 + i * 4}px` }} />
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
        <audio ref={audioRef} onError={() => setError(isRTL ? 'فشل التشغيل' : 'Playback error')} />
      </div>
    </FeatureGate>
  );
}
