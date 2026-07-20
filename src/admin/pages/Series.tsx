import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Play, ExternalLink } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const series = [
  { title: 'Cyber Protocol', season: 'S1', img: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
  { title: 'Neon Dynasty', season: 'S2', img: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
  { title: 'Shadow Lines', season: 'S1', img: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
  { title: 'Digital Empire', season: 'S3', img: 'https://images.pexels.com/photos/1111599/pexels-photo-1111599.jpeg?w=400', telegram: 'https://t.me/shams_guard_bot' },
];

export default function Series() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  return (
    <FeatureGate feature="series" fallback={<FeatureComingSoon label={t.series || 'Series'} />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">📺 {t.series || 'Series'}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {series.map((s, i) => (
            <a key={i} href={s.telegram} target="_blank" rel="noopener noreferrer" className="group shams-card overflow-hidden p-0">
              <div className="relative h-40 overflow-hidden">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Play size={32} className="text-shams-400" />
                </div>
                <div className="absolute bottom-2 right-2 bg-blue-600 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                  <ExternalLink size={12} /> Telegram
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.season}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </FeatureGate>
  );
}
