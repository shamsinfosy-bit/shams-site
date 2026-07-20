import { useState } from 'react';
import { useAppStore } from '../../store';
import { Megaphone, Plus, Eye, MousePointer, TrendingUp, X } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

interface Ad {
  id: number;
  title: string;
  type: 'banner' | 'video' | 'sponsored';
  status: 'active' | 'paused' | 'ended';
  impressions: number;
  clicks: number;
  budget: number;
  spent: number;
}

const initialAds: Ad[] = [
  { id: 1, title: 'SHAMS Premium Campaign', type: 'banner', status: 'active', impressions: 124500, clicks: 3200, budget: 500, spent: 320 },
  { id: 2, title: 'New Series Launch', type: 'video', status: 'active', impressions: 89000, clicks: 5100, budget: 800, spent: 650 },
  { id: 3, title: 'Kids Zone Promo', type: 'sponsored', status: 'paused', impressions: 45000, clicks: 1200, budget: 300, spent: 180 },
];

export default function Advertisements() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  const [ads, setAds] = useState<Ad[]>(initialAds);

  const totalImpressions = ads.reduce((s, a) => s + a.impressions, 0);
  const totalClicks      = ads.reduce((s, a) => s + a.clicks, 0);
  const totalSpent       = ads.reduce((s, a) => s + a.spent, 0);
  const avgCTR           = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';

  function toggleStatus(id: number) {
    setAds((prev) => prev.map((a) => a.id === id ? { ...a, status: a.status === 'active' ? 'paused' : 'active' } : a));
  }

  function removeAd(id: number) {
    setAds((prev) => prev.filter((a) => a.id !== id));
  }

  const statusColor = (s: Ad['status']) =>
    s === 'active' ? 'text-green-400 bg-green-400/10' : s === 'paused' ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-400 bg-gray-800';

  const typeLabel = (t: Ad['type'], ar: boolean) =>
    t === 'banner' ? (ar ? 'بانر' : 'Banner') : t === 'video' ? (ar ? 'فيديو' : 'Video') : (ar ? 'مموّل' : 'Sponsored');

  return (
    <FeatureGate feature="advertisements" fallback={<FeatureComingSoon label={isRTL ? 'الإعلانات' : 'Advertisements'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Megaphone size={24} className="text-shams-400" />
            <h1 className="text-2xl font-bold text-white">{isRTL ? 'إدارة الإعلانات' : 'Advertisements'}</h1>
          </div>
          <button className="shams-btn-primary flex items-center gap-2">
            <Plus size={16} /> {isRTL ? 'إعلان جديد' : 'New Ad'}
          </button>
        </div>

        {/* إحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: isRTL ? 'الظهورات' : 'Impressions', value: totalImpressions.toLocaleString(), icon: Eye, color: 'text-blue-400' },
            { label: isRTL ? 'النقرات' : 'Clicks', value: totalClicks.toLocaleString(), icon: MousePointer, color: 'text-green-400' },
            { label: 'CTR', value: `${avgCTR}%`, icon: TrendingUp, color: 'text-shams-400' },
            { label: isRTL ? 'الإنفاق' : 'Spent', value: `$${totalSpent}`, icon: Megaphone, color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className="shams-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{stat.label}</span>
                <stat.icon size={16} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* جدول الإعلانات */}
        <div className="shams-card overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-800">
              <tr className="text-xs text-gray-400">
                <th className="pb-3 text-right font-medium">{isRTL ? 'الإعلان' : 'Ad'}</th>
                <th className="pb-3 text-right font-medium">{isRTL ? 'النوع' : 'Type'}</th>
                <th className="pb-3 text-right font-medium">{isRTL ? 'الحالة' : 'Status'}</th>
                <th className="pb-3 text-right font-medium">{isRTL ? 'الظهورات' : 'Impressions'}</th>
                <th className="pb-3 text-right font-medium">{isRTL ? 'النقرات' : 'Clicks'}</th>
                <th className="pb-3 text-right font-medium">{isRTL ? 'الميزانية' : 'Budget'}</th>
                <th className="pb-3 text-center font-medium">{isRTL ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {ads.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-800/20 transition">
                  <td className="py-3 text-white font-medium">{ad.title}</td>
                  <td className="py-3 text-gray-400 text-sm">{typeLabel(ad.type, isRTL)}</td>
                  <td className="py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(ad.status)}`}>
                      {ad.status === 'active' ? (isRTL ? 'نشط' : 'Active') : ad.status === 'paused' ? (isRTL ? 'موقوف' : 'Paused') : (isRTL ? 'منتهي' : 'Ended')}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400 text-sm">{ad.impressions.toLocaleString()}</td>
                  <td className="py-3 text-gray-400 text-sm">{ad.clicks.toLocaleString()}</td>
                  <td className="py-3 text-sm">
                    <div>
                      <span className="text-white">${ad.spent}</span>
                      <span className="text-gray-500"> / ${ad.budget}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-800 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-shams-500 rounded-full" style={{ width: `${(ad.spent / ad.budget) * 100}%` }} />
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => toggleStatus(ad.id)} className="text-xs shams-btn-ghost px-2 py-1">
                        {ad.status === 'active' ? (isRTL ? 'إيقاف' : 'Pause') : (isRTL ? 'تشغيل' : 'Resume')}
                      </button>
                      <button onClick={() => removeAd(ad.id)} className="text-red-400 hover:text-red-300 transition">
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FeatureGate>
  );
}
