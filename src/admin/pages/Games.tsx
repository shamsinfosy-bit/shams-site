import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Star, ExternalLink } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const games = [
  { title: 'Cyber Arena', genre: 'Action', rating: '4.8', img: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?w=400' },
  { title: 'Neon Racer', genre: 'Racing', rating: '4.5', img: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=400' },
  { title: 'Quantum Quest', genre: 'RPG', rating: '4.9', img: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?w=400' },
  { title: 'Shadow Strike', genre: 'Strategy', rating: '4.3', img: 'https://images.pexels.com/photos/1111599/pexels-photo-1111599.jpeg?w=400' },
];

export default function Games() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  return (
    <FeatureGate feature="games" fallback={<FeatureComingSoon label={t.games || 'Games'} />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">🎮 {t.games || 'Games'}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((g, i) => (
            <div key={i} className="shams-card overflow-hidden p-0 group">
              <div className="relative h-40 overflow-hidden">
                <img src={g.img} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <ExternalLink size={24} className="text-white" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">{g.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">{g.genre}</span>
                  <span className="text-xs text-shams-400 flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> {g.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FeatureGate>
  );
}
