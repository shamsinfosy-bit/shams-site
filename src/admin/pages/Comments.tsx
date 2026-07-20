import { useState } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { MessageSquare, CheckCircle, XCircle, Trash2 } from 'lucide-react';

export default function Comments() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  const [comments, setComments] = useState([
    { id: 1, user: 'John', text: 'Great video!', status: 'approved', date: '2026-06-28' },
    { id: 2, user: 'Sarah', text: 'When is the next episode?', status: 'pending', date: '2026-06-27' },
    { id: 3, user: 'Ahmed', text: 'Amazing quality!', status: 'approved', date: '2026-06-26' },
    { id: 4, user: 'Emily', text: 'Not working properly.', status: 'flagged', date: '2026-06-25' },
  ]);

  const handleAction = (id: number, action: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: action } : c));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">💬 {t.comments || 'Comments'}</h1>
      <div className="shams-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800">
            <tr className="text-gray-400 text-sm">
              <th className="pb-3">User</th>
              <th className="pb-3">Comment</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
              <th className="pb-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(c => (
              <tr key={c.id} className="border-b border-gray-800/50">
                <td className="py-3 pr-4 text-white font-medium">{c.user}</td>
                <td className="py-3 pr-4 text-gray-400">{c.text}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    c.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{c.status}</span>
                </td>
                <td className="py-3 pr-4 text-gray-400">{c.date}</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleAction(c.id, 'approved')} className="text-green-400 hover:text-green-300"><CheckCircle size={18} /></button>
                    <button onClick={() => handleAction(c.id, 'flagged')} className="text-yellow-400 hover:text-yellow-300"><XCircle size={18} /></button>
                    <button onClick={() => setComments(comments.filter(x => x.id !== c.id))} className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
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
