import { useState } from 'react';
import { useAppStore } from '../../store';
import { Mic, Play, Pause, Clock } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const episodes = [
  { id: 1, title: 'The Future of AI in Media', titleAr: 'مستقبل الذكاء الاصطناعي في الإعلام', duration: '45:20', host: 'SHAMS Team', episode: 'EP01' },
  { id: 2, title: 'Building a Streaming Platform', titleAr: 'بناء منصة بث احترافية', duration: '38:15', host: 'Tech Talk', episode: 'EP02' },
  { id: 3, title: 'Content Creation Tips', titleAr: 'نصائح صناعة المحتوى', duration: '52:40', host: 'SHAMS Team', episode: 'EP03' },
  { id: 4, title: 'Monetization Strategies', titleAr: 'استراتيجيات تحقيق الدخل', duration: '41:05', host: 'Business Hub', episode: 'EP04' },
];

export default function Podcasts() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <FeatureGate feature="podcasts" fallback={<FeatureComingSoon label={isRTL ? 'البودكاست' : 'Podcasts'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-3">
          <Mic size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'البودكاست' : 'Podcasts'}</h1>
        </div>
        <div className="space-y-3">
          {episodes.map((ep) => {
            const isPlaying = playing === ep.id;
            const title = isRTL ? ep.titleAr : ep.title;
            return (
              <div key={ep.id} className={`shams-card flex items-center gap-4 transition-all ${isPlaying ? 'border-shams-500/50 bg-shams-500/5' : ''}`}>
                <button
                  onClick={() => setPlaying(isPlaying ? null : ep.id)}
                  className="w-12 h-12 rounded-full bg-shams-500/10 border border-shams-500/30 flex items-center justify-center flex-shrink-0 hover:bg-shams-500/20 transition"
                >
                  {isPlaying
                    ? <Pause size={18} className="text-shams-400" />
                    : <Play size={18} className="text-shams-400 ml-0.5" />
                  }
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-shams-400 font-bold">{ep.episode}</span>
                  </div>
                  <h3 className={`font-semibold truncate ${isPlaying ? 'text-shams-400' : 'text-white'}`}>{title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{ep.host}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                  <Clock size={12} />
                  {ep.duration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureGate>
  );
}
