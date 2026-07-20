import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminLayout from '../admin/layout/AdminLayout';
import AdminOTPGuard from '../admin/layout/AdminOTPGuard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

const AdminDashboard    = lazy(() => import('../admin/pages/Dashboard'));
const Users             = lazy(() => import('../admin/pages/Users'));
const Content           = lazy(() => import('../admin/pages/Content'));
const Analytics         = lazy(() => import('../admin/pages/Analytics'));
const Revenue           = lazy(() => import('../admin/pages/Revenue'));
const Comments          = lazy(() => import('../admin/pages/Comments'));
const Scheduler         = lazy(() => import('../admin/pages/Scheduler'));
const NotificationsPage = lazy(() => import('../admin/pages/NotificationsPage'));
const ActivityLog       = lazy(() => import('../admin/pages/ActivityLog'));
const SettingsPage      = lazy(() => import('../admin/pages/SettingsPage'));
const Roles             = lazy(() => import('../admin/pages/Roles'));
const AITips            = lazy(() => import('../admin/pages/AITips'));
const Login             = lazy(() => import('../admin/pages/Auth/Login'));
const PublicHome        = lazy(() => import('../admin/pages/PublicHome'));
const Movies            = lazy(() => import('../admin/pages/Movies'));
const Series            = lazy(() => import('../admin/pages/Series'));
const Music             = lazy(() => import('../admin/pages/Music'));
const News              = lazy(() => import('../admin/pages/News'));
const Games             = lazy(() => import('../admin/pages/Games'));
const About             = lazy(() => import('../admin/pages/About'));
const Contact           = lazy(() => import('../admin/pages/Contact'));
const FeatureFlagsPage  = lazy(() => import('../admin/pages/FeatureFlags'));
const AIStudio          = lazy(() => import('../admin/pages/AIStudio'));
const Podcasts          = lazy(() => import('../admin/pages/Podcasts'));
const Articles          = lazy(() => import('../admin/pages/Articles'));
const KidsZone          = lazy(() => import('../admin/pages/KidsZone'));
const Sports            = lazy(() => import('../admin/pages/Sports'));
const Advertisements    = lazy(() => import('../admin/pages/Advertisements'));
const Subscriptions     = lazy(() => import('../admin/pages/Subscriptions'));
const SmartSearch       = lazy(() => import('../admin/pages/SmartSearch'));
const UploadPage        = lazy(() => import('../admin/pages/Upload'));
const WatchPage         = lazy(() => import('../admin/pages/Watch'));
const RadioPage         = lazy(() => import('../admin/pages/Radio'));

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#c9a050' }}>Loading...</div>}>{children}</Suspense>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#c9a050', background: '#000', minHeight: '100vh' }}>Initializing session...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

const router = createHashRouter([
  { path: '/login', element: <LazyPage><Login /></LazyPage> },
  { path: '/', element: <ProtectedRoute><PublicHome /></ProtectedRoute> },
  {
    path: '/admin',
    element: <AdminOTPGuard><AdminLayout /></AdminOTPGuard>,
    children: [
      { index: true,                 element: <LazyPage><AdminDashboard /></LazyPage>   },
      { path: 'users',               element: <LazyPage><Users /></LazyPage>             },
      { path: 'content',             element: <LazyPage><Content /></LazyPage>           },
      { path: 'analytics',           element: <LazyPage><Analytics /></LazyPage>         },
      { path: 'revenue',             element: <LazyPage><Revenue /></LazyPage>           },
      { path: 'comments',            element: <LazyPage><Comments /></LazyPage>          },
      { path: 'scheduler',           element: <LazyPage><Scheduler /></LazyPage>         },
      { path: 'notifications',       element: <LazyPage><NotificationsPage /></LazyPage> },
      { path: 'activity',            element: <LazyPage><ActivityLog /></LazyPage>       },
      { path: 'settings',            element: <LazyPage><SettingsPage /></LazyPage>      },
      { path: 'roles',               element: <LazyPage><Roles /></LazyPage>             },
      { path: 'ai-suggestions',      element: <LazyPage><AITips /></LazyPage>            },
      { path: 'feature-flags',       element: <LazyPage><FeatureFlagsPage /></LazyPage>  },
      { path: 'upload',              element: <LazyPage><UploadPage /></LazyPage>          },
    ],
  },
  { path: '/movies',  element: <ProtectedRoute><LazyPage><Movies /></LazyPage></ProtectedRoute>  },
  { path: '/series',  element: <ProtectedRoute><LazyPage><Series /></LazyPage></ProtectedRoute>  },
  { path: '/music',   element: <ProtectedRoute><LazyPage><Music /></LazyPage></ProtectedRoute>   },
  { path: '/news',    element: <ProtectedRoute><LazyPage><News /></LazyPage></ProtectedRoute>    },
  { path: '/games',   element: <ProtectedRoute><LazyPage><Games /></LazyPage></ProtectedRoute>   },
  { path: '/about',   element: <ProtectedRoute><LazyPage><About /></LazyPage></ProtectedRoute>   },
  { path: '/contact', element: <ProtectedRoute><LazyPage><Contact /></LazyPage></ProtectedRoute> },
  { path: '/watch/:id', element: <ProtectedRoute><LazyPage><WatchPage /></LazyPage></ProtectedRoute> },
  { path: '/radio', element: <ProtectedRoute><LazyPage><RadioPage /></LazyPage></ProtectedRoute> },
  { path: '/ai-studio', element: <ProtectedRoute><LazyPage><AIStudio /></LazyPage></ProtectedRoute> },
  { path: '/podcasts', element: <ProtectedRoute><LazyPage><Podcasts /></LazyPage></ProtectedRoute> },
  { path: '/articles', element: <ProtectedRoute><LazyPage><Articles /></LazyPage></ProtectedRoute> },
  { path: '/kids', element: <ProtectedRoute><LazyPage><KidsZone /></LazyPage></ProtectedRoute> },
  { path: '/sports', element: <ProtectedRoute><LazyPage><Sports /></LazyPage></ProtectedRoute> },
  { path: '/ads', element: <ProtectedRoute><LazyPage><Advertisements /></LazyPage></ProtectedRoute> },
  { path: '/subscriptions', element: <ProtectedRoute><LazyPage><Subscriptions /></LazyPage></ProtectedRoute> },
  { path: '/search', element: <ProtectedRoute><LazyPage><SmartSearch /></LazyPage></ProtectedRoute> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
