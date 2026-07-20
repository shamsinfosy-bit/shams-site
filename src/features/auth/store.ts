import { create } from 'zustand';
import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export type UserRole = 'director' | 'deputy' | 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  isDirector: () => boolean;
  isDeputy: () => boolean;
  isAdmin: () => boolean;
  canAccess: (page: string) => boolean;
  canDelete: () => boolean;
  canManageUsers: () => boolean;
  canViewAuditLog: () => boolean;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  authLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
  isDirector: () => get().user?.role === 'director',
  isDeputy: () => get().user?.role === 'deputy' || get().user?.role === 'director',
  isAdmin: () => get().user?.role === 'admin' || get().user?.role === 'deputy' || get().user?.role === 'director',
  canDelete: () => get().user?.role === 'admin' || get().user?.role === 'deputy' || get().user?.role === 'director',
  canManageUsers: () => get().user?.role === 'director',
  canViewAuditLog: () => get().user?.role === 'director',
  canAccess: (page: string) => {
    const role = get().user?.role;
    const permissions: Record<string, UserRole[]> = {
      console: ['director', 'deputy'],
      manager: ['director', 'deputy'],
      dashboard: ['director', 'deputy', 'admin'],
      upload: ['director', 'deputy', 'admin', 'user'],
      watch: ['director', 'deputy', 'admin', 'user'],
      explore: ['director', 'deputy', 'admin', 'user'],
      radio: ['director', 'deputy', 'admin', 'user'],
      kids: ['director', 'deputy', 'admin', 'user'],
      aiStudio: ['director', 'deputy', 'admin', 'user'],
      settings: ['director', 'deputy', 'admin'],
      auditLog: ['director', 'deputy'],
      adminPanel: ['director'],
      approvals: ['director', 'deputy', 'admin'],
    };
    return role ? permissions[page]?.includes(role) ?? false : false;
  },
}));

// مستمع المصادقة الوحيد
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const idTokenResult = await firebaseUser.getIdTokenResult();
    const role = (idTokenResult.claims.role as UserRole) || 'user';
    const user: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      email: firebaseUser.email || '',
      role: role,
    };
    useUserStore.setState({ user, isAuthenticated: true, authLoading: false });
  } else {
    useUserStore.setState({ user: null, isAuthenticated: false, authLoading: false });
  }
});

export const defaultUsers = {
  director: { id: '1', name: 'Director', email: 'director@shams.com', role: 'director' as UserRole },
  deputy: { id: '5', name: 'Deputy Director', email: 'deputy@shams.com', role: 'deputy' as UserRole },
  admin: { id: '2', name: 'Admin', email: 'admin@shams.com', role: 'admin' as UserRole },
  user: { id: '3', name: 'User', email: 'user@shams.com', role: 'user' as UserRole },
};
