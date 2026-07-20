import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Bell, Check, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const notifs = [
    { id: 1, text: 'New user registered', time: '2 min ago', read: false },
    { id: 2, text: 'Video uploaded successfully', time: '15 min ago', read: false },
    { id: 3, text: 'Revenue threshold reached', time: '1 hour ago', read: true },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">🔔 {t.notifications || 'Notifications'}</h1>
      <div className="shams-card">
        <div className="space-y-4">
          {notifs.map(n => (
            <div key={n.id} className={`flex items-center gap-4 p-4 rounded-lg ${n.read ? 'bg-gray-800/30' : 'bg-shams-500/10 border border-shams-500/20'}`}>
              <Bell size={20} className={n.read ? 'text-gray-400' : 'text-shams-400'} />
              <div className="flex-1">
                <p className="text-white font-medium">{n.text}</p>
                <p className="text-sm text-gray-400">{n.time}</p>
              </div>
              {!n.read && <button className="text-shams-400 hover:text-shams-300"><Check size={18} /></button>}
              <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
