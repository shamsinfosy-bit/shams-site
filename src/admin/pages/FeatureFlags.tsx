import { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight, RefreshCw, AlertTriangle, CheckCircle, Layers } from 'lucide-react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { useAllFeatureFlags } from '../../hooks/useFeatureFlag';
import { setFeatureFlag, initializeFeatureFlags } from '../../services/featureFlags';
import { type FeatureFlagKey, FEATURE_FLAG_CATEGORIES } from '../../types/featureFlags';

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  content:  { en: 'Content',        ar: 'المحتوى' },
  ai:       { en: 'AI & Search',    ar: 'الذكاء الاصطناعي' },
  creator:  { en: 'Creator Tools',  ar: 'أدوات المبدعين' },
  admin:    { en: 'Administration', ar: 'الإدارة' },
  business: { en: 'Business',       ar: 'الأعمال' },
  platform: { en: 'Platform',       ar: 'المنصة' },
};

const FLAG_LABELS: Partial<Record<FeatureFlagKey, { en: string; ar: string }>> = {
  movies:           { en: 'Movies',           ar: 'الأفلام' },
  series:           { en: 'Series',           ar: 'المسلسلات' },
  music:            { en: 'Music',            ar: 'الموسيقى' },
  news:             { en: 'News',             ar: 'الأخبار' },
  games:            { en: 'Games',            ar: 'الألعاب' },
  watch:            { en: 'Video Player',     ar: 'مشاهدة الفيديو' },
  radio:            { en: 'Live Radio',       ar: 'الراديو المباشر' },
  podcasts:         { en: 'Podcasts',         ar: 'البودكاست' },
  articles:         { en: 'Articles',         ar: 'المقالات' },
  kidsZone:         { en: 'Kids Zone',        ar: 'منطقة الأطفال' },
  sports:           { en: 'Sports',           ar: 'الرياضة' },
  aiStudio:         { en: 'AI Studio',        ar: 'استوديو الذكاء الاصطناعي' },
  aiSuggestions:    { en: 'AI Suggestions',   ar: 'اقتراحات الذكاء الاصطناعي' },
  smartSearch:      { en: 'Smart Search',     ar: 'البحث الذكي' },
  upload:           { en: 'Upload Portal',    ar: 'بوابة الرفع' },
  adminDashboard:   { en: 'Dashboard',        ar: 'لوحة التحكم' },
  userManagement:   { en: 'Users',            ar: 'المستخدمون' },
  contentManagement:{ en: 'Content Mgmt',     ar: 'إدارة المحتوى' },
  analytics:        { en: 'Analytics',        ar: 'التحليلات' },
  revenue:          { en: 'Revenue',          ar: 'الإيرادات' },
  comments:         { en: 'Comments',         ar: 'التعليقات' },
  scheduler:        { en: 'Scheduler',        ar: 'الجدولة' },
  notifications:    { en: 'Notifications',    ar: 'الإشعارات' },
  activityLog:      { en: 'Activity Log',     ar: 'سجل النشاط' },
  settings:         { en: 'Settings',         ar: 'الإعدادات' },
  roles:            { en: 'Roles',            ar: 'الصلاحيات' },
  advertisements:   { en: 'Advertisements',   ar: 'الإعلانات' },
  subscriptions:    { en: 'Subscriptions',    ar: 'الاشتراكات' },
  seoOptimization:  { en: 'SEO',              ar: 'تحسين محركات البحث' },
  multiLanguage:    { en: 'Multi-Language',   ar: 'تعدد اللغات' },
};

export default function FeatureFlagsPage() {
  const language = useAppStore((s) => s.language);
  const flags = useAllFeatureFlags();
  const isRTL = language === 'ar';
  const [saving, setSaving] = useState<FeatureFlagKey | null>(null);
  const [initializing, setInitializing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(t);
  }, [message]);

  async function handleToggle(key: FeatureFlagKey, current: boolean) {
    setSaving(key);
    try {
      await setFeatureFlag(key, !current);
      setMessage({ type: 'success', text: isRTL ? `تم التحديث بنجاح` : 'Updated successfully' });
    } catch {
      setMessage({ type: 'error', text: isRTL ? 'فشل التحديث. تحقق من صلاحياتك.' : 'Update failed. Check permissions.' });
    } finally {
      setSaving(null);
    }
  }

  async function handleInitialize() {
    setInitializing(true);
    try {
      await initializeFeatureFlags();
      setMessage({ type: 'success', text: isRTL ? 'تمت التهيئة بنجاح' : 'Initialized successfully' });
    } catch {
      setMessage({ type: 'error', text: isRTL ? 'فشلت التهيئة' : 'Initialization failed' });
    } finally {
      setInitializing(false);
    }
  }

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Layers size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'إدارة الميزات' : 'Feature Flags'}</h1>
        </div>
        <button onClick={handleInitialize} disabled={initializing} className="flex items-center gap-2 shams-btn-ghost text-sm disabled:opacity-50">
          <RefreshCw size={16} className={initializing ? 'animate-spin' : ''} />
          {isRTL ? 'تهيئة أولية' : 'Initialize Defaults'}
        </button>
      </div>

      {message && (
        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/30 text-green-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
          {message.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {message.text}
        </div>
      )}

      <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-yellow-400 text-xs">
        <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
        <span>{isRTL ? 'تعطيل أي ميزة يخفيها فوراً عن جميع المستخدمين.' : 'Disabling any feature hides it immediately for all users.'}</span>
      </div>

      {Object.entries(FEATURE_FLAG_CATEGORIES).map(([category, keys]) => (
        <div key={category} className="shams-card">
          <h2 className="text-sm font-semibold text-shams-400 uppercase tracking-wider mb-4">
            {CATEGORY_LABELS[category]?.[language as 'en' | 'ar'] ?? category}
          </h2>
          <div className="space-y-1">
            {keys.map((key) => {
              const isEnabled = flags[key];
              const isSaving = saving === key;
              const label = FLAG_LABELS[key]?.[language as 'en' | 'ar'] ?? key;
              return (
                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium">{label}</p>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{key}</p>
                  </div>
                  <button onClick={() => handleToggle(key, isEnabled)} disabled={isSaving} className="flex items-center gap-2 ml-4 disabled:opacity-50 transition-opacity">
                    {isSaving ? <RefreshCw size={20} className="animate-spin text-gray-400" /> : isEnabled ? <ToggleRight size={28} className="text-shams-400" /> : <ToggleLeft size={28} className="text-gray-600" />}
                    <span className={`text-xs font-medium w-12 ${isEnabled ? 'text-shams-400' : 'text-gray-500'}`}>
                      {isEnabled ? (isRTL ? 'مفعّل' : 'ON') : (isRTL ? 'معطّل' : 'OFF')}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
