import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Clock, ExternalLink } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const articles = [
  { title: 'SHAMS Platform Launches AI Studio', time: '2h ago', category: 'Tech', url: '#' },
  { title: 'New Series: Cyber Protocol Season 2', time: '5h ago', category: 'Entertainment', url: '#' },
  { title: 'Radio Feature Now Available', time: '1d ago', category: 'Update', url: '#' },
  { title: 'Feature Flags System Deployed', time: '2d ago', category: 'Tech', url: '#' },
];

export default function News() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  return (
    <FeatureGate feature="news" fallback={<FeatureComingSoon label={t.news || 'News'} />}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">📰 {t.news || 'News'}</h1>
        <div className="space-y-4">
          {articles.map((a, i) => (
            <a key={i} href={a.url} className="shams-card flex items-start gap-4 block hover:border-shams-500/30 transition">
              <div className="flex-1 min-w-0">
                <span className="text-xs text-shams-400 font-semibold uppercase">{a.category}</span>
                <h3 className="text-white font-semibold mt-1">{a.title}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <Clock size={12} /> {a.time}
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 flex-shrink-0 mt-1" />
            </a>
          ))}
        </div>
      </div>
    </FeatureGate>
  );
}
