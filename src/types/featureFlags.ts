export type FeatureFlagKey =
  | 'movies' | 'series' | 'music' | 'news' | 'games'
  | 'watch' | 'radio' | 'podcasts' | 'articles' | 'kidsZone' | 'sports'
  | 'aiStudio' | 'aiSuggestions' | 'smartSearch'
  | 'upload'
  | 'adminDashboard' | 'userManagement' | 'contentManagement'
  | 'analytics' | 'revenue' | 'comments' | 'scheduler'
  | 'notifications' | 'activityLog' | 'settings' | 'roles'
  | 'advertisements' | 'subscriptions'
  | 'seoOptimization' | 'multiLanguage';

export interface FeatureFlag {
  enabled: boolean;
  updatedAt: string;
  updatedBy: string | null;
  description?: string;
}

export type FeatureFlagsDocument = Record<FeatureFlagKey, FeatureFlag>;
export type FeatureFlagsMap = Record<FeatureFlagKey, boolean>;

export const DEFAULT_FEATURE_FLAGS: FeatureFlagsMap = {
  movies: true, series: true, music: true, news: true, games: true,
  watch: true, radio: true, podcasts: true, articles: true, kidsZone: true, sports: true,
  aiStudio: true, aiSuggestions: true, smartSearch: true,
  upload: false,
  adminDashboard: true, userManagement: true, contentManagement: true,
  analytics: true, revenue: true, comments: true, scheduler: true,
  notifications: true, activityLog: false, settings: true, roles: true,
  advertisements: false, subscriptions: false,
  seoOptimization: false, multiLanguage: true,
};

export const FEATURE_FLAG_CATEGORIES: Record<string, FeatureFlagKey[]> = {
  content: ['movies','series','music','news','games','watch','radio','podcasts','articles','kidsZone','sports'],
  ai: ['aiStudio','aiSuggestions','smartSearch'],
  creator: ['upload'],
  admin: ['adminDashboard','userManagement','contentManagement','analytics','revenue','comments','scheduler','notifications','activityLog','settings','roles'],
  business: ['advertisements','subscriptions'],
  platform: ['seoOptimization','multiLanguage'],
};
