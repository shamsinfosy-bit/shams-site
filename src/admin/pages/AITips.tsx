import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Sparkles } from 'lucide-react';

export default function AITips() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const tips = [
    { title: 'Optimal Posting Time', desc: 'Based on your audience, 8 PM on Fridays gets 35% more engagement.' },
    { title: 'Content Suggestion', desc: 'Your Sci‑Fi videos perform best. Consider creating more content in this category.' },
    { title: 'SEO Improvement', desc: 'Add more keywords to your video descriptions to improve search ranking.' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">🤖 {t.aiSuggestions || 'AI Tips'}</h1>
      <div className="space-y-4">
        {tips.map((tip, i) => (
          <div key={i} className="shams-card flex items-start gap-4">
            <Sparkles size={24} className="text-shams-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-semibold">{tip.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
