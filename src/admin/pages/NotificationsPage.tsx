import { useEffect, useState } from 'react';
import { useAppStore } from '../../store';
import { useUserStore } from '../../features/auth/store';
import { translations } from '../../i18n/translations';
import { Bell, Check, Trash2 } from 'lucide-react';
import { subscribeNotifications, markNotificationRead, deleteNotification } from '../../services/firestore';

interface NotificationItem {
  id: string;
  text?: string;
  read?: boolean;
  createdAt?: any;
}

export default function NotificationsPage() {
  const language = useAppStore(s => s.language);
  const currentUser = useUserStore(s => s.user);
  const t = translations[language];

  const [notifs, setNotifs] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.id) return;
    const unsubscribe = subscribeNotifications(currentUser.id, (data) => {
      setNotifs(data as NotificationItem[]);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser?.id]);

  const formatTime = (createdAt: any) => {
    if (createdAt?.toDate) return createdAt.toDate().toLocaleString();
    return '';
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400">
        Loading notifications...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white"> 🔔 {t.notifications || 'Notifications'}</h1>
      <div className="shams-card">
        <div className="space-y-4">
          {notifs.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              {language === 'ar' ? 'لا توجد إشعارات بعد' : 'No notifications yet'}
            </p>
          )}
          {notifs.map(n => (
            <div key={n.id} className={`flex items-center gap-4 p-4 rounded-lg ${n.read ? 'bg-gray-800/30' : 'bg-shams-500/10 border border-shams-500/20'}`}>
              <Bell size={20} className={n.read ? 'text-gray-400' : 'text-shams-400'} />
              <div className="flex-1">
                <p className="text-white font-medium">{n.text}</p>
                <p className="text-sm text-gray-400">{formatTime(n.createdAt)}</p>
              </div>
              {!n.read && (
                <button onClick={() => markNotificationRead(n.id)} className="text-shams-400 hover:text-shams-300">
                  <Check size={18} />
                </button>
              )}
              <button onClick={() => deleteNotification(n.id)} className="text-red-400 hover:text-red-300">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
