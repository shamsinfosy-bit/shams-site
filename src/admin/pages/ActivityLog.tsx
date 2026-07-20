import { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Activity } from 'lucide-react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';

interface LogEntry {
  id: string;
  email: string;
  action: string;
  method: string;
  timestamp: any;
}

export default function ActivityLog() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'activityLog'), orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LogEntry));
      setLogs(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-400">Loading activity...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">📋 {t.activity || 'Activity Log'}</h1>
      <div className="shams-card">
        {logs.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No activity recorded yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                <Activity size={20} className="text-shams-400" />
                <div className="flex-1">
                  <p className="text-white font-medium">{log.email}</p>
                  <p className="text-sm text-gray-400">
                    {log.action} via {log.method} — {log.timestamp?.toDate?.().toLocaleString() || 'Just now'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
