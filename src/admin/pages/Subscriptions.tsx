import { useState } from 'react';
import { useAppStore } from '../../store';
import { Crown, Check, Users, TrendingUp, DollarSign } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const plans = [
  {
    id: 'free',
    name: { en: 'Free', ar: 'مجاني' },
    price: 0,
    color: 'border-gray-700',
    features: { en: ['5 videos/month', 'SD quality', 'Ads supported'], ar: ['5 فيديوهات/شهر', 'جودة SD', 'مع إعلانات'] },
  },
  {
    id: 'basic',
    name: { en: 'Basic', ar: 'أساسي' },
    price: 4.99,
    color: 'border-blue-500/50',
    features: { en: ['Unlimited videos', 'HD quality', 'No ads'], ar: ['فيديوهات غير محدودة', 'جودة HD', 'بدون إعلانات'] },
  },
  {
    id: 'premium',
    name: { en: 'Premium', ar: 'مميز' },
    price: 9.99,
    color: 'border-shams-500/50',
    features: { en: ['Everything in Basic', '4K quality', 'AI Studio access', 'Download content'], ar: ['كل مزايا الأساسي', 'جودة 4K', 'استوديو AI', 'تحميل المحتوى'] },
  },
  {
    id: 'family',
    name: { en: 'Family', ar: 'عائلي' },
    price: 14.99,
    color: 'border-purple-500/50',
    features: { en: ['5 profiles', 'Kids Zone', 'All Premium features'], ar: ['5 ملفات شخصية', 'منطقة الأطفال', 'كل مزايا المميز'] },
  },
];

const stats = [
  { label: { en: 'Total Subscribers', ar: 'إجمالي المشتركين' }, value: '12,450', icon: Users, color: 'text-blue-400' },
  { label: { en: 'Monthly Revenue', ar: 'الإيراد الشهري' }, value: '$48,230', icon: DollarSign, color: 'text-green-400' },
  { label: { en: 'Growth Rate', ar: 'معدل النمو' }, value: '+18.5%', icon: TrendingUp, color: 'text-shams-400' },
  { label: { en: 'Premium Users', ar: 'مشتركو المميز' }, value: '3,820', icon: Crown, color: 'text-purple-400' },
];

export default function Subscriptions() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  const lang = (isRTL ? 'ar' : 'en') as 'en' | 'ar';
  const [activePlan, setActivePlan] = useState('premium');

  return (
    <FeatureGate feature="subscriptions" fallback={<FeatureComingSoon label={isRTL ? 'الاشتراكات' : 'Subscriptions'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="flex items-center gap-3">
          <Crown size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'إدارة الاشتراكات' : 'Subscriptions'}</h1>
        </div>

        {/* إحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="shams-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{stat.label[lang]}</span>
                <stat.icon size={16} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* خطط الاشتراك */}
        <h2 className="text-lg font-bold text-white">{isRTL ? 'خطط الاشتراك' : 'Subscription Plans'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => {
            const isActive = activePlan === plan.id;
            return (
              <div key={plan.id} className={`shams-card border-2 transition-all ${isActive ? plan.color : 'border-transparent'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white">{plan.name[lang]}</h3>
                  {plan.id === 'premium' && (
                    <span className="text-xs bg-shams-500/20 text-shams-400 px-2 py-0.5 rounded-full font-bold">
                      {isRTL ? 'الأكثر شعبية' : 'Popular'}
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-black text-white">${plan.price}</span>
                  <span className="text-gray-400 text-sm">/{isRTL ? 'شهر' : 'mo'}</span>
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features[lang].map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check size={14} className="text-shams-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActivePlan(plan.id)}
                  className={`w-full py-2 rounded-lg text-sm font-bold transition ${isActive ? 'shams-btn-primary' : 'shams-btn-ghost'}`}
                >
                  {isActive ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'تفعيل' : 'Activate')}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </FeatureGate>
  );
}
