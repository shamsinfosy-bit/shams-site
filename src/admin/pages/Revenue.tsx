import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

export default function Revenue() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const summary = [
    { title: 'Total Revenue', value: '$48,250', change: '+18.2%', icon: DollarSign, up: true },
    { title: 'Monthly Earnings', value: '$12,450', change: '+8.5%', icon: TrendingUp, up: true },
    { title: 'Pending Payouts', value: '$3,200', change: '-2.1%', icon: TrendingDown, up: false },
    { title: 'Lifetime Earnings', value: '$182,400', change: '+24.8%', icon: ArrowUpRight, up: true },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">💰 {t.revenue || 'Revenue'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, i) => (
          <div key={i} className="shams-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
                <p className={`text-xs mt-1 ${item.up ? 'text-green-400' : 'text-red-400'}`}>{item.change}</p>
              </div>
              <item.icon size={24} className="text-shams-400" />
            </div>
          </div>
        ))}
      </div>
      <div className="shams-card">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            { desc: 'Ad Revenue - Google AdSense', amount: '+$2,450', date: '2026-06-28' },
            { desc: 'Subscription - VIP Plan', amount: '+$15.99', date: '2026-06-27' },
            { desc: 'Affiliate Commission', amount: '+$89.50', date: '2026-06-26' },
            { desc: 'Payout to Bank', amount: '-$2,000', date: '2026-06-25' },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
              <div>
                <p className="text-sm text-white">{tx.desc}</p>
                <p className="text-xs text-gray-500">{tx.date}</p>
              </div>
              <span className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
