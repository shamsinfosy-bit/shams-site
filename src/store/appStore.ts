import { create } from 'zustand';

interface AppState {
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  language: 'en' | 'ar' | 'fr' | 'ru';
  darkMode: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
  toggleSidebar: () => void;
  setLanguage: (lang: 'en' | 'ar' | 'fr' | 'ru') => void;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  mobileMenuOpen: false,
  language: (localStorage.getItem('shams_lang') as any) || 'en',
  darkMode: localStorage.getItem('shams_dark') !== 'false',
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  setMobileMenuOpen: (v) => set({ mobileMenuOpen: v }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setLanguage: (lang) => { localStorage.setItem('shams_lang', lang); set({ language: lang }); },
  toggleDarkMode: () => {
    const newMode = !useAppStore.getState().darkMode;
    localStorage.setItem('shams_dark', String(newMode));
    set({ darkMode: newMode });
  },
}));
