import { useState, useCallback } from 'react';
import { useAppStore } from '../../store';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Search, Film, Music, Radio, FileText, Mic, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

interface Result {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  mediaType: string;
  status: string;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  movies: Film, series: Film, music: Music,
  radio: Radio, podcasts: Mic, news: FileText,
  games: FileText, articles: FileText,
};

const CATEGORY_COLORS: Record<string, string> = {
  movies: 'text-blue-400', series: 'text-purple-400', music: 'text-green-400',
  radio: 'text-yellow-400', podcasts: 'text-orange-400', news: 'text-red-400',
  games: 'text-pink-400', articles: 'text-cyan-400',
};

export default function SmartSearch() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  const navigate = useNavigate();

  const [query_, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const snap = await getDocs(
        query(collection(db, 'content'), where('status', '==', 'published'), limit(50))
      );
      const all = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Result));
      const lower = q.toLowerCase();
      const filtered = all.filter((item) =>
        item.title?.toLowerCase().includes(lower) ||
        item.titleAr?.includes(q) ||
        item.category?.toLowerCase().includes(lower)
      );
      setResults(filtered);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch(query_);
  }

  function goToContent(item: Result) {
    if (item.mediaType === 'video' || item.mediaType === 'audio') {
      navigate(`/watch/${item.id}`);
    }
  }



  return (
    <FeatureGate feature="smartSearch" fallback={<FeatureComingSoon label={isRTL ? 'البحث الذكي' : 'Smart Search'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="flex items-center gap-3">
          <Search size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'البحث الذكي' : 'Smart Search'}</h1>
        </div>

        {/* شريط البحث */}
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus-within:border-shams-500 transition">
            <Search size={18} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={query_}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRTL ? 'ابحث عن أفلام، موسيقى، أخبار...' : 'Search movies, music, news...'}
              className="bg-transparent outline-none text-white placeholder-gray-500 w-full text-sm"
              autoFocus
            />
            {loading && <Loader size={16} className="text-shams-400 animate-spin flex-shrink-0" />}
          </div>
          <button
            onClick={() => handleSearch(query_)}
            disabled={loading || !query_.trim()}
            className="shams-btn-primary px-6 disabled:opacity-50"
          >
            {isRTL ? 'بحث' : 'Search'}
          </button>
        </div>

        {/* النتائج */}
        {searched && !loading && (
          <div>
            <p className="text-sm text-gray-400 mb-3">
              {results.length > 0
                ? `${results.length} ${isRTL ? 'نتيجة' : 'results'}`
                : (isRTL ? 'لا توجد نتائج' : 'No results found')}
            </p>
            <div className="space-y-2">
              {results.map((item) => {
                const Icon = CATEGORY_ICONS[item.category] || FileText;
                const color = CATEGORY_COLORS[item.category] || 'text-gray-400';
                const displayTitle = isRTL && item.titleAr ? item.titleAr : item.title;
                return (
                  <button
                    key={item.id}
                    onClick={() => goToContent(item)}
                    className="w-full shams-card flex items-center gap-4 text-left hover:border-shams-500/50 transition"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{displayTitle}</p>
                      <p className="text-xs text-gray-500 capitalize mt-0.5">{item.category} • {item.mediaType}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* حالة البداية */}
        {!searched && (
          <div className="text-center py-16 text-gray-600">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">{isRTL ? 'ابدأ بكتابة كلمة للبحث' : 'Start typing to search'}</p>
          </div>
        )}
      </div>
    </FeatureGate>
  );
}
