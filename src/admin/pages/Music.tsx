import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Play, Music as MusicIcon } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const tracks = [
  { title: 'Midnight Pulse', artist: 'SHAMS Originals', duration: '3:42' },
  { title: 'Neon Waves', artist: 'Digital Sounds', duration: '4:15' },
  { title: 'Future Bass', artist: 'Cyber Beats', duration: '3:58' },
  { title: 'Solar Wind', artist: 'SHAMS Originals', duration: '5:02' },
];

export default function Music() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  return (
    <FeatureGate feature="music" fallback={<FeatureComingSoon label={t.music || 'Music'} />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">🎵 {t.music || 'Music'}</h1>
        <div className="shams-card space-y-2">
          {tracks.map((track, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition group">
              <div className="w-10 h-10 bg-shams-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MusicIcon size={18} className="text-shams-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{track.title}</p>
                <p className="text-sm text-gray-400 truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-gray-500">{track.duration}</span>
              <button className="text-gray-600 hover:text-shams-400 transition opacity-0 group-hover:opacity-100">
                <Play size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </FeatureGate>
  );
}
