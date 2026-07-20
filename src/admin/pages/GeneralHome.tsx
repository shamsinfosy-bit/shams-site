import { useAppStore, useUserStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Play, Film, Tv, Music, Newspaper, Gamepad2, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GeneralHome() {
  const language = useAppStore(s => s.language);
  const user = useUserStore(s => s.user);
  const t = translations[language];
  const isAdmin = user?.role === 'director' || user?.role === 'deputy' || user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <div className="text-6xl mb-6">☀️</div>
        <h1 className="text-4xl font-bold text-shams-400 mb-4">SHAMS</h1>
        <p className="text-lg text-gray-400 mb-8">
          {t.heroDesc || 'Welcome to the future of entertainment.'}
        </p>

        {/* Dashboard button for admins */}
        {isAdmin && (
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-shams-500 text-black font-semibold rounded-lg hover:bg-shams-600 transition mb-8"
          >
            <LayoutDashboard size={20} />
            {t.dashboard || 'Dashboard'}
          </Link>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
          <Link to="/movies" className="flex flex-col items-center gap-2 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-shams-500/30 transition">
            <Film size={32} className="text-shams-400" />
            <span className="text-sm">{t.movies || 'Movies'}</span>
          </Link>
          <Link to="/series" className="flex flex-col items-center gap-2 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-shams-500/30 transition">
            <Tv size={32} className="text-shams-400" />
            <span className="text-sm">{t.series || 'Series'}</span>
          </Link>
          <Link to="/music" className="flex flex-col items-center gap-2 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-shams-500/30 transition">
            <Music size={32} className="text-shams-400" />
            <span className="text-sm">{t.music || 'Music'}</span>
          </Link>
          <Link to="/news" className="flex flex-col items-center gap-2 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-shams-500/30 transition">
            <Newspaper size={32} className="text-shams-400" />
            <span className="text-sm">{t.blog || 'News'}</span>
          </Link>
          <Link to="/games" className="flex flex-col items-center gap-2 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-shams-500/30 transition">
            <Gamepad2 size={32} className="text-shams-400" />
            <span className="text-sm">{t.activity || 'Games'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
