import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Globe, Moon, Bell, Shield, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const items = [
    { icon: Globe, label: t.language || 'Language', value: language.toUpperCase() },
    { icon: Moon, label: t.darkMode || 'Dark Mode', value: 'Enabled' },
    { icon: Bell, label: t.notifications || 'Notifications', value: 'On' },
    { icon: Shield, label: t.roles || 'Privacy', value: 'High' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">⚙️ {t.settings || 'Settings'}</h1>
      <div className="shams-card">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-4 border-b border-gray-800 last:border-0 cursor-pointer hover:bg-gray-800/30 px-2 -mx-2 rounded transition">
            <div className="flex items-center gap-3">
              <item.icon size={20} className="text-shams-400" />
              <span className="text-white">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">{item.value}</span>
              <ChevronRight size={16} className="text-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
