import { Bell, Search, Sun, Moon, User, LogOut, Globe } from 'lucide-react';
import { useAppStore, useUserStore } from '../../store';
import { translations, Language } from '../../i18n/translations';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/firebase';

const langs: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'fr', label: 'FR' },
  { code: 'ru', label: 'RU' },
];

export default function AdminHeader() {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const language = useAppStore(s => s.language);
  const setLanguage = useAppStore(s => s.setLanguage);
  const darkMode = useAppStore(s => s.darkMode);
  const toggleDarkMode = useAppStore(s => s.toggleDarkMode);
  const user = useUserStore(s => s.user);
  const logout = useUserStore(s => s.logout);
  const t = translations[language];
  const navigate = useNavigate();
  const langRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    logout();
    localStorage.removeItem('csrf_token');
    navigate('/login');
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder={t.search}
          className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-500 w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative" ref={langRef}>
          <button onClick={() => setShowLangMenu(!showLangMenu)} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition" title="Language">
            <Globe size={18} />
          </button>
          {showLangMenu && (
            <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg py-2 min-w-[60px] z-50 shadow-lg">
              {langs.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                  className={`block w-full text-left px-4 py-1.5 text-sm hover:bg-gray-700 transition-colors ${language === lang.code ? 'text-shams-400 font-semibold' : 'text-gray-300'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={toggleDarkMode} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition" title={darkMode ? t.lightMode : t.darkMode}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="relative text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-shams-500 flex items-center justify-center text-black font-bold">
            <User size={16} />
          </div>
          <span className="text-sm font-medium hidden sm:block">{user?.name || 'Admin'}</span>
        </div>
        <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-gray-800 transition" title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
