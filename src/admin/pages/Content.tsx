import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Search, FileVideo, Image, FileText, Eye, Edit, Trash2, Play } from 'lucide-react';

const initialContent = [
  { id: 1, title: 'Neon Horizons', type: 'video', status: 'published', views: '2.4M', date: '2026-06-20' },
  { id: 2, title: 'Digital Dreams Poster', type: 'image', status: 'published', views: '1.8M', date: '2026-06-18' },
  { id: 3, title: 'Behind the Scenes', type: 'article', status: 'draft', views: '—', date: '2026-06-15' },
  { id: 4, title: 'Future Echo Teaser', type: 'video', status: 'published', views: '3.1M', date: '2026-06-10' },
  { id: 5, title: 'Quantum Realm Art', type: 'image', status: 'published', views: '4.2M', date: '2026-06-05' },
];

export default function Content() {
  const language = useAppStore(s => s.language);
  const navigate = useNavigate();
  const t = translations[language];
  const [content, setContent] = useState(initialContent);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredContent = content.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || c.type === filter;
    return matchesSearch && matchesFilter;
  });

  const deleteContent = (id: number) => {
    setContent(content.filter(c => c.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <FileVideo size={18} className="text-blue-400" />;
      case 'image': return <Image size={18} className="text-purple-400" />;
      case 'article': return <FileText size={18} className="text-green-400" />;
      default: return <Eye size={18} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">{t.content}</h1>
        <button className="shams-btn-primary">
          + {t.upload || 'Add Content'}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-500 w-full"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-gray-300 text-sm"
        >
          <option value="all">{t.content || 'All Content'}</option>
          <option value="video">{t.videos || 'Videos'}</option>
          <option value="image">{t.portfolio || 'Images'}</option>
          <option value="article">{t.blog || 'Articles'}</option>
        </select>
      </div>

      <div className="shams-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800">
            <tr className="text-gray-400 text-sm">
              <th className="pb-3">{t.name || 'Title'}</th>
              <th className="pb-3">{t.dashboard || 'Type'}</th>
              <th className="pb-3">{t.activity || 'Status'}</th>
              <th className="pb-3">{t.totalViews || 'Views'}</th>
              <th className="pb-3">{t.scheduler || 'Date'}</th>
              <th className="pb-3 text-center">{t.settings || 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map(item => (
              <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                <td className="py-3 pr-4 text-white font-medium flex items-center gap-2">
                  {getTypeIcon(item.type)} {item.title}
                </td>
                <td className="py-3 pr-4 text-gray-400 capitalize">{item.type}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-400">{item.views}</td>
                <td className="py-3 pr-4 text-gray-400">{item.date}</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => navigate(`/watch/${item.id}`)} className="text-blue-400 hover:text-blue-300"><Play size={18} /></button>
                    <button className="text-gray-400 hover:text-white"><Edit size={18} /></button>
                    <button onClick={() => deleteContent(item.id)} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
