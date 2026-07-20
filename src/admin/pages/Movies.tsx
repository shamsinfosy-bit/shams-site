import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Play, ExternalLink } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const movies = [
  { title: 'Neon Horizons', year: '2025', img: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
  { title: 'Digital Dreams', year: '2024', img: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
  { title: 'Future Echo', year: '2025', img: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
  { title: 'Quantum Realm', year: '2024', img: 'https://images.pexels.com/photos/1111599/pexels-photo-1111599.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
];

export default function Movies() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  return (
    <FeatureGate feature="movies" fallback={<FeatureComingSoon label={t.movies || 'Movies'} />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">🎬 {t.movies || 'Movies'}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((m, i) => (
            <a key={i} href={m.telegram} target="_blank" rel="noopener noreferrer" className="group shams-card overflow-hidden p-0">
              <div className="relative h-40 overflow-hidden">
                <img src={m.img} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play size={32} className="text-shams-400" />
                </div>
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                  <ExternalLink size={12} /> Telegram
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">{m.title}</h3>
                <p className="text-sm text-gray-400">{m.year}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </FeatureGate>
  );
}
