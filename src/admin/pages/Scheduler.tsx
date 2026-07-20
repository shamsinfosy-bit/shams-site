import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Calendar, Clock, Video } from 'lucide-react';

export default function Scheduler() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const tasks = [
    { title: 'Upload "Neon Horizons" Trailer', time: '2026-06-29 10:00 AM', type: 'video' },
    { title: 'Post Weekly News', time: '2026-06-30 08:00 AM', type: 'article' },
    { title: 'Live Stream Event', time: '2026-07-01 06:00 PM', type: 'live' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">📅 {t.scheduler || 'Scheduler'}</h1>
      <div className="shams-card">
        <h3 className="text-lg font-semibold text-white mb-4">Upcoming Tasks</h3>
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-shams-500/20 flex items-center justify-center">
                {task.type === 'video' ? <Video size={20} className="text-shams-400" /> : <Clock size={20} className="text-shams-400" />}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{task.title}</p>
                <p className="text-sm text-gray-400 flex items-center gap-1"><Calendar size={14} /> {task.time}</p>
              </div>
              <button className="text-shams-400 text-sm hover:text-shams-300">Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
