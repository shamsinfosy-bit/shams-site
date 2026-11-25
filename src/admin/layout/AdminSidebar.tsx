import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard, Users, FileVideo, Upload, Calendar, BarChart3,
  DollarSign, MessageSquare, Bell, Settings, Shield, Activity,
  Sparkles, ChevronLeft, ChevronRight, Layers, Radio, Mic, FileText, Star, Trophy, Megaphone, Crown, Search,
} from 'lucide-react';
import { useAppStore } from '../../store';
import { useUserStore } from '../../store';
import { translations } from '../../i18n/translations';

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const language = useAppStore((s) => s.language);
  const canAccess = useUserStore((s) => s.canAccess);
  const t = translations[language];
  const isRTL = language === 'ar';

  const links = [
    { to: '/admin',               icon: LayoutDashboard, label: t.dashboard      || 'Dashboard',     page: 'dashboard'      },
    { to: '/admin/users',         icon: Users,           label: t.users          || 'Users',          page: 'users'          },
    { to: '/admin/content',       icon: FileVideo,       label: t.content        || 'Content',        page: 'content'        },
    { to: '/admin/upload',        icon: Upload,          label: t.upload         || 'Upload',         page: 'upload'         },
    { to: '/admin/scheduler',     icon: Calendar,        label: t.scheduler      || 'Scheduler',      page: 'scheduler'      },
    { to: '/admin/analytics',     icon: BarChart3,       label: t.analytics      || 'Analytics',      page: 'analytics'      },
    { to: '/admin/revenue',       icon: DollarSign,      label: t.revenue        || 'Revenue',        page: 'revenue'        },
    { to: '/admin/comments',      icon: MessageSquare,   label: t.comments       || 'Comments',       page: 'comments'       },
    { to: '/admin/notifications', icon: Bell,            label: t.notifications  || 'Notifications',  page: 'notifications'  },
    { to: '/admin/activity',      icon: Activity,        label: t.activity       || 'Activity',       page: 'activity'       },
    { to: '/admin/settings',      icon: Settings,        label: t.settings       || 'Settings',       page: 'settings'       },
    { to: '/admin/roles',         icon: Shield,          label: t.roles          || 'Roles',          page: 'roles'          },
    { to: '/admin/ai-suggestions',icon: Sparkles,        label: t.aiSuggestions  || 'AI Tips',        page: 'ai-suggestions' },
    { to: '/admin/feature-flags', icon: Layers,          label: t.featureFlags   || 'Feature Flags',  page: 'feature-flags'  },

    // صفحات عامة بالموقع - ما تخضع لفلترة الصلاحيات
    { to: '/radio',               icon: Radio,           label: t.radio          || 'Radio'         },
    { to: '/ai-studio',           icon: Sparkles,        label: isRTL ? 'استوديو AI' : 'AI Studio'  },
    { to: '/podcasts',            icon: Mic,             label: isRTL ? 'البودكاست' : 'Podcasts'    },
    { to: '/articles',            icon: FileText,        label: isRTL ? 'المقالات' : 'Articles'     },
    { to: '/kids',                icon: Star,            label: isRTL ? 'منطقة الأطفال' : 'Kids Zone'  },
    { to: '/sports',              icon: Trophy,          label: isRTL ? 'الرياضة' : 'Sports'           },
    { to: '/ads',                 icon: Megaphone,       label: isRTL ? 'الإعلانات' : 'Ads'              },
    { to: '/subscriptions',       icon: Crown,           label: isRTL ? 'الاشتراكات' : 'Subscriptions'   },
    { to: '/search',              icon: Search,          label: isRTL ? 'البحث الذكي' : 'Smart Search'    },
  ];

  // فلترة الروابط: أي رابط له "page" لازم يمر عبر canAccess، وأي رابط بدون "page" (صفحات عامة) يظهر دائماً
  const visibleLinks = links.filter((link) =>
    !link.page || canAccess(link.page)
  );

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300`}>
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!collapsed && <span className="text-shams-400 font-bold text-xl">SHAMS</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white p-1 transition">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {visibleLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-shams-500/10 text-shams-400 border-l-2 border-shams-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            <link.icon size={20} />
            {!collapsed && <span className="text-sm font-medium">{link.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
