import { useState, useRef, useEffect } from 'react';
import { useAppStore, useUserStore } from '../../store';
import { translations, Language } from '../../i18n/translations';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play, TrendingUp, Clock, Star, ChevronRight, LayoutDashboard,
  Film, Tv, Music, Newspaper, Gamepad2, FileText, Mail, BookOpen,
  Search, Bell, User, Globe, LogOut, Radio, Mic, Baby, Trophy, Sparkles,
} from 'lucide-react';

const featured = [
  { id: 1, title: 'Neon Horizons',  category: 'Sci-Fi',      image: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?w=600', views: '2.4M' },
  { id: 2, title: 'Digital Dreams', category: 'Documentary', image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?w=600',   views: '1.8M' },
  { id: 3, title: 'Future Echo',    category: 'Action',      image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?w=600', views: '3.1M' },
  { id: 4, title: 'Quantum Realm',  category: 'Thriller',    image: 'https://images.pexels.com/photos/1111599/pexels-photo-1111599.jpeg?w=600', views: '4.2M' },
];

const trending = [
  { id: 1, title: 'Cyber Legends',   views: '5.2M', rank: 1 },
  { id: 2, title: 'Shadow Protocol', views: '4.8M', rank: 2 },
  { id: 3, title: 'Quantum Break',   views: '3.9M', rank: 3 },
  { id: 4, title: 'Neon Drift',      views: '3.5M', rank: 4 },
  { id: 5, title: 'Binary Storm',    views: '2.9M', rank: 5 },
];

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'fr', label: 'FR' },
  { code: 'ru', label: 'RU' },
];

export default function PublicHome() {
  const language    = useAppStore(s => s.language);
  const setLanguage = useAppStore(s => s.setLanguage);
  const user        = useUserStore(s => s.user);
  const doLogout    = useUserStore(s => s.logout);
  const t           = translations[language];
  const navigate    = useNavigate();
  const isRTL       = language === 'ar';
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const isAdmin = user?.role === 'director' || user?.role === 'deputy' || user?.role === 'admin';

  const quickLinks = [
    { to: '/movies',   icon: Film,      label: t.movies  || 'Movies'    },
    { to: '/series',   icon: Tv,        label: t.series  || 'Series'    },
    { to: '/music',    icon: Music,     label: t.music   || 'Music'     },
    { to: '/news',     icon: Newspaper, label: t.news    || 'News'      },
    { to: '/games',    icon: Gamepad2,  label: t.games   || 'Games'     },
    { to: '/radio',    icon: Radio,     label: t.radio   || 'Radio'     },
    { to: '/podcasts', icon: Mic,       label: isRTL ? 'بودكاست'   : 'Podcasts'   },
    { to: '/articles', icon: FileText,  label: isRTL ? 'مقالات'    : 'Articles'   },
    { to: '/kids',     icon: Baby,      label: isRTL ? 'أطفال'     : 'Kids'       },
    { to: '/sports',   icon: Trophy,    label: isRTL ? 'رياضة'     : 'Sports'     },
    { to: '/search',   icon: Search,    label: isRTL ? 'بحث'       : 'Search'     },
    { to: '/ai-studio',icon: Sparkles,  label: isRTL ? 'استوديو AI': 'AI Studio'  },
  ];

  const handleLogout = async () => {
    await doLogout();
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
    <div className="min-h-screen bg-gray-950 text-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-shams-400 font-bold text-xl">SHAMS</Link>
          <div className="hidden sm:flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 flex-1 max-w-xs mx-4">
            <Search size={16} className="text-gray-400" />
            <input type="text" placeholder={t.search || 'Search'} className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500 w-full" onKeyDown={(e) => e.key === 'Enter' && navigate('/search')} />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative" ref={langRef}>
              <button onClick={() => setShowLangMenu(!showLangMenu)} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition"><Globe size={18} /></button>
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg py-2 min-w-[60px] z-50 shadow-lg">
                  {languages.map(lang => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setShowLangMenu(false); }}
                      className={`block w-full text-left px-4 py-1.5 text-sm hover:bg-gray-700 transition ${language === lang.code ? 'text-shams-400 font-semibold' : 'text-gray-300'}`}>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="relative text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition">
              <Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-700">
              <div className="w-8 h-8 rounded-full bg-shams-500 flex items-center justify-center text-black"><User size={16} /></div>
              <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
            </div>
            {isAdmin && (
              <Link to="/admin" className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition">
                <LayoutDashboard size={16} /> {t.dashboard || 'Dashboard'}
              </Link>
            )}
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-gray-800 transition"><LogOut size={18} /></button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <span className="text-shams-400 text-sm uppercase tracking-wider">{t.welcome || 'Welcome to'}</span>
          <h1 className="text-5xl font-bold text-shams-400 my-4">SHAMS</h1>
          <p className="text-gray-400 text-lg mb-8">{t.heroDesc || 'Experience the future of entertainment.'}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/movies" className="shams-btn-primary inline-flex items-center gap-2"><Play size={18} /> {t.startWatching || 'Start Watching'}</Link>
            <Link to="/search" className="shams-btn-ghost inline-flex items-center gap-2"><Search size={18} /> {t.search || 'Explore'}</Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {quickLinks.map((link, i) => (
            <Link key={i} to={link.to} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:border-shams-500/30 hover:text-shams-400 transition text-sm font-medium">
              <link.icon size={18} /><span>{link.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t.featured || 'Featured'}</h2>
          <Link to="/movies" className="text-shams-400 text-sm flex items-center gap-1">{t.viewAll || 'View All'} <ChevronRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(item => (
            <Link to={`/watch/${item.id}`} key={item.id} className="group bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-shams-500/30 transition">
              <div className="relative h-40 overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><Play size={32} className="text-shams-400" /></div>
              </div>
              <div className="p-4">
                <span className="text-xs text-shams-400">{item.category}</span>
                <h3 className="font-semibold mt-1">{item.title}</h3>
                <span className="text-xs text-gray-400">{item.views} {isRTL ? 'مشاهدة' : 'views'}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><TrendingUp size={24} /> {t.trending || 'Trending'}</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          {trending.map(item => (
            <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-800 last:border-0">
              <span className="text-2xl font-bold text-shams-400 w-8">{item.rank}</span>
              <div className="flex-1"><h4 className="font-semibold">{item.title}</h4><span className="text-sm text-gray-400">{item.views} {isRTL ? 'مشاهدة' : 'views'}</span></div>
              <Link to="/movies" className="text-shams-400 text-sm">{t.watch || (isRTL ? 'شاهد' : 'Watch')}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Watch Later & Favorites */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-shams-500/30 transition">
          <Clock size={32} className="mx-auto text-shams-400 mb-3" />
          <h3 className="font-semibold">{t.watchLater || 'Watch Later'}</h3>
          <p className="text-gray-400 text-sm mt-1">{isRTL ? '١٢ عنصر' : '12 items saved'}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-shams-500/30 transition">
          <Star size={32} className="mx-auto text-shams-400 mb-3" />
          <h3 className="font-semibold">{t.favorites || 'Favorites'}</h3>
          <p className="text-gray-400 text-sm mt-1">{isRTL ? '٨ مفضلة' : '8 favorites'}</p>
        </div>
      </section>

      {/* Footer Links */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="h-px bg-gradient-to-r from-transparent via-shams-500/30 to-transparent mb-8" />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { to: '/about',   icon: BookOpen,  label: t.about   || 'About'   },
            { to: '/news',    icon: Newspaper, label: t.news    || 'News'    },
            { to: '/contact', icon: Mail,      label: t.contact || 'Contact' },
          ].map((link, i) => (
            <Link key={i} to={link.to} className="flex items-center gap-2 px-5 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:border-shams-500/30 hover:text-shams-400 transition text-sm font-medium">
              <link.icon size={20} /><span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
