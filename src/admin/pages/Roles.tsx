import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Shield } from 'lucide-react';

export default function Roles() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const roles = [
    { name: 'Director', permissions: 'Full access', users: 1 },
    { name: 'Deputy', permissions: 'Manage users & content', users: 1 },
    { name: 'Admin', permissions: 'Moderate content', users: 2 },
    { name: 'User', permissions: 'View content', users: 1250 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">🛡️ {t.roles || 'Roles'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <div key={i} className="shams-card flex items-center gap-4">
            <Shield size={32} className="text-shams-400" />
            <div>
              <h3 className="text-white font-semibold">{role.name}</h3>
              <p className="text-sm text-gray-400">{role.permissions}</p>
              <p className="text-xs text-shams-400 mt-1">{role.users} users</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
