import { useEffect, useState } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Shield } from 'lucide-react';
import { getUsers } from '../../services/firestore';

interface RoleSummary {
  name: string;
  key: 'director' | 'deputy' | 'admin' | 'user';
  permissions: string;
  users: number;
}

export default function Roles() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  const isRTL = language === 'ar';

  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Record<string, number>>({
    director: 0, deputy: 0, admin: 0, user: 0
  });

  useEffect(() => {
    let cancelled = false;

    async function loadCounts() {
      try {
        const users = await getUsers();
        if (cancelled) return;

        const tally: Record<string, number> = {
          director: 0, deputy: 0, admin: 0, user: 0
        };
        users.forEach((u: any) => {
          const role = u.role || 'user';
          if (tally[role] !== undefined) tally[role] += 1;
        });
        setCounts(tally);
      } catch (err) {
        console.error('Roles load error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCounts();
    return () => { cancelled = true };
  }, []);

  const roles: RoleSummary[] = [
    {
      name: isRTL ? 'المدير' : 'Director',
      key: 'director',
      permissions: isRTL ? 'صلاحية كاملة' : 'Full access',
      users: counts.director
    },
    {
      name: isRTL ? 'المعاون' : 'Deputy',
      key: 'deputy',
      permissions: isRTL ? 'كل شي ما عدا المحاسبة وتعديل الموقع' : 'Everything except accounting & site editing',
      users: counts.deputy
    },
    {
      name: isRTL ? 'الأدمن' : 'Admin',
      key: 'admin',
      permissions: isRTL ? 'إدارة المستخدمين والنشر، بدون حذف أو محاسبة' : 'Manage users & publishing, no delete or accounting',
      users: counts.admin
    },
    {
      name: isRTL ? 'مستخدم' : 'User',
      key: 'user',
      permissions: isRTL ? 'مشاهدة المحتوى فقط' : 'View content only',
      users: counts.user
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">🛡️ {t.roles || 'Roles'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div key={role.key} className="shams-card flex items-center gap-4">
            <Shield size={32} className="text-shams-400" />
            <div>
              <h3 className="text-white font-semibold">{role.name}</h3>
              <p className="text-sm text-gray-400">{role.permissions}</p>
              <p className="text-xs text-shams-400 mt-1">
                {loading ? '...' : role.users} {isRTL ? 'مستخدم' : 'users'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
