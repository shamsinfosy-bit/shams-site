import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Shield, Globe, Users, Play } from 'lucide-react';

export default function About() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-shams-400 mb-6">ℹ️ {t.about || 'About'}</h1>
      <p className="text-gray-400 mb-8">{t.heroDesc || 'SHAMS is an intelligent media platform.'}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Play, label: '4K Streaming' },
          { icon: Globe, label: '4 Languages' },
          { icon: Shield, label: 'Secure' },
          { icon: Users, label: 'Community' },
        ].map((f, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col items-center gap-2">
            <f.icon size={24} className="text-shams-400" />
            <span className="text-sm">{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
