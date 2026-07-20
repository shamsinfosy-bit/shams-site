import { useState } from 'react';
import { useAppStore } from '../../store';
import { FileText, Clock, User, Search } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const articles = [
  { id: 1, title: 'The Rise of AI in Entertainment', titleAr: 'صعود الذكاء الاصطناعي في الترفيه', author: 'SHAMS Editorial', date: '2026-06-20', readTime: '5 min', category: 'Tech' },
  { id: 2, title: 'How to Build a Media Brand', titleAr: 'كيف تبني علامة إعلامية', author: 'Content Team', date: '2026-06-18', readTime: '8 min', category: 'Business' },
  { id: 3, title: 'Streaming Quality: 4K vs 1080p', titleAr: 'جودة البث: 4K مقابل 1080p', author: 'Tech Team', date: '2026-06-15', readTime: '4 min', category: 'Tech' },
  { id: 4, title: 'Monetizing Your Content in 2026', titleAr: 'تحقيق الدخل من محتواك في 2026', author: 'SHAMS Editorial', date: '2026-06-10', readTime: '6 min', category: 'Business' },
  { id: 5, title: 'Kids Content: Safety Guidelines', titleAr: 'محتوى الأطفال: إرشادات السلامة', author: 'Safety Team', date: '2026-06-05', readTime: '7 min', category: 'Safety' },
];

const CATEGORIES = ['All', 'Tech', 'Business', 'Safety'];

export default function Articles() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = articles.filter((a) => {
    const title = isRTL ? a.titleAr : a.title;
    const matchSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || a.category === category;
    return matchSearch && matchCat;
  });

  return (
    <FeatureGate feature="articles" fallback={<FeatureComingSoon label={isRTL ? 'المقالات' : 'Articles'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-3">
          <FileText size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'المقالات' : 'Articles'}</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 flex-1">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? 'ابحث في المقالات...' : 'Search articles...'}
              className="bg-transparent outline-none text-sm text-gray-300 placeholder-gray-500 w-full"
            />
          </div>
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${category === cat ? 'bg-shams-500/20 text-shams-400 border border-shams-500/30' : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-12">{isRTL ? 'لا توجد مقالات' : 'No articles found'}</div>
          ) : filtered.map((article) => {
            const title = isRTL ? article.titleAr : article.title;
            return (
              <div key={article.id} className="shams-card hover:border-shams-500/30 transition cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-shams-400 font-semibold">{article.category}</span>
                    <h3 className="text-white font-semibold mt-1 hover:text-shams-400 transition">{title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><User size={11} />{article.author}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <FileText size={20} className="text-gray-700 flex-shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureGate>
  );
}
