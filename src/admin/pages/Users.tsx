import { useState, useEffect } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Search, Edit, Trash2, CheckCircle } from 'lucide-react';
import { subscribeUsers, saveUser, deleteUser } from '../../services/firestore';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function Users() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeUsers((data) => {
      setUsers(data as UserRecord[]);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleRoleChange = async (uid: string, newRole: string) => {
    await saveUser(uid, { role: newRole });
    setEditingId(null);
  };

  const handleToggleBan = async (uid: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    await saveUser(uid, { status: newStatus });
  };

  const handleDelete = async (uid: string) => {
    await deleteUser(uid);
  };

  const filteredUsers = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-gray-400">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">{t.users || 'Users'}</h1>
        <button className="shams-btn-primary">
          + {t.register || 'Add User'}
        </button>
      </div>

      <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-gray-300 placeholder-gray-500 w-full"
        />
      </div>

      <div className="shams-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-gray-800">
            <tr className="text-gray-400 text-sm">
              <th className="pb-3">{t.name || 'Name'}</th>
              <th className="pb-3">{t.email || 'Email'}</th>
              <th className="pb-3">{t.roles || 'Role'}</th>
              <th className="pb-3">{t.activity || 'Status'}</th>
              <th className="pb-3 text-center">{t.settings || 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                <td className="py-3 pr-4 text-white font-medium">{user.name}</td>
                <td className="py-3 pr-4 text-gray-400">{user.email}</td>
                <td className="py-3 pr-4">
                  {editingId === user.id ? (
                    <select
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-white text-sm"
                    >
                      <option value="director">👑 Director</option>
                      <option value="deputy">🥈 Deputy</option>
                      <option value="admin">🛡️ Admin</option>
                      <option value="user">👤 User</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'director' ? 'bg-yellow-500/20 text-yellow-400' :
                      user.role === 'deputy' ? 'bg-orange-500/20 text-orange-400' :
                      user.role === 'admin' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <button
                    onClick={() => handleToggleBan(user.id, user.status)}
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {user.status === 'active' ? '✅ Active' : '🚫 Banned'}
                  </button>
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {editingId === user.id ? (
                      <button onClick={() => handleRoleChange(user.id, editRole)} className="text-green-400 hover:text-green-300">
                        <CheckCircle size={18} />
                      </button>
                    ) : (
                      <button onClick={() => { setEditingId(user.id); setEditRole(user.role); }} className="text-gray-400 hover:text-white">
                        <Edit size={18} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
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
