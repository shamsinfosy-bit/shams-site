import { useState } from 'react';
import { useAppStore } from '../../store';
import { translations, Language } from '../../i18n/translations';
import { Globe, Moon, Bell, Shield, ChevronRight } from 'lucide-react';

const LANGS: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'Français' },
  { code: 'ru', label: 'Русский' },
];

export default function SettingsPage() {
  const language = useAppStore(s => s.language);
  const setLanguage = useAppStore(s => s.setLanguage);
  const darkMode = useAppStore(s => s.darkMode);
  const toggleDarkMode = useAppStore(s => s.toggleDarkMode);
  const t = translations[language];

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">⚙️ {t.settings || 'Settings'}</h1>
      <div className="shams-card">

        {/* اللغة — مربوطة فعلياً */}
        <div className="border-b border-gray-800">
          <div
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-800/30 px-2 -mx-2 rounded transition"
          >
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-shams-400" />
              <span className="text-white">{t.language || 'Language'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">{language.toUpperCase()}</span>
              <ChevronRight size={16} className={`text-gray-500 transition-transform ${langMenuOpen ? 'rotate-90' : ''}`} />
            </div>
          </div>
          {langMenuOpen && (
            <div className="pb-4 pl-9 space-y-2">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLanguage(l.code); setLangMenuOpen(false); }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    language === l.code ? 'bg-shams-500/20 text-shams-400' : 'text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* الوضع الليلي — مربوط فعلياً */}
        <div
          onClick={toggleDarkMode}
          className="flex items-center justify-between py-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/30 px-2 -mx-2 rounded transition"
        >
          <div className="flex items-center gap-3">
            <Moon size={20} className="text-shams-400" />
            <span className="text-white">{t.darkMode || 'Dark Mode'}</span>
          </div>
          <span className="text-gray-400 text-sm">{darkMode ? 'Enabled' : 'Disabled'}</span>
        </div>

        {/* الإشعارات — ميزة مستقبلية، مو وهمية */}
        <div className="flex items-center justify-between py-4 border-b border-gray-800 opacity-50 cursor-not-allowed px-2 -mx-2">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-gray-500" />
            <span className="text-gray-400">{t.notifications || 'Notifications'}</span>
          </div>
          <span className="text-gray-500 text-xs italic">
            {language === 'ar' ? 'قريباً' : 'Coming soon'}
          </span>
        </div>

        {/* الخصوصية — ميزة مستقبلية، مو وهمية */}
        <div className="flex items-center justify-between py-4 opacity-50 cursor-not-allowed px-2 -mx-2">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-gray-500" />
            <span className="text-gray-400">{t.roles || 'Privacy'}</span>
          </div>
          <span className="text-gray-500 text-xs italic">
            {language === 'ar' ? 'قريباً' : 'Coming soon'}
          </span>
        </div>

      </div>
    </div>
  );
}
