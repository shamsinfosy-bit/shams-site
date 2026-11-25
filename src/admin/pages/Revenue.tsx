import { useEffect, useState } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { DollarSign, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { getRevenue } from '../../services/firestore';

interface RevenueRecord {
  id: string;
  amount?: number;
  description?: string;
  createdAt?: any;
}

export default function Revenue() {
  const language = useAppStore(s => s.language);
  const t = translations[language];

  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<RevenueRecord[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getRevenue();
        if (!cancelled) setRecords(data as RevenueRecord[]);
      } catch (err) {
        console.error('Revenue load error:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true };
  }, []);

  const totalRevenue = records
    .filter(r => (r.amount || 0) > 0)
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const totalPayouts = records
    .filter(r => (r.amount || 0) < 0)
    .reduce((sum, r) => sum + Math.abs(r.amount || 0), 0);

  const now = new Date();
  const monthlyEarnings = records
    .filter(r => {
      const d = r.createdAt?.toDate ? r.createdAt.toDate() : null;
      return d && (r.amount || 0) > 0 &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const netTotal = totalRevenue - totalPayouts;

  const summary = [
    { title: 'Total Revenue',     value: loading ? '...' : `$${totalRevenue.toLocaleString()}`,    icon: DollarSign,   up: true },
    { title: 'Monthly Earnings',  value: loading ? '...' : `$${monthlyEarnings.toLocaleString()}`,  icon: TrendingUp,   up: true },
    { title: 'Total Payouts',     value: loading ? '...' : `$${totalPayouts.toLocaleString()}`,     icon: TrendingDown, up: false },
    { title: 'Net Total',         value: loading ? '...' : `$${netTotal.toLocaleString()}`,         icon: ArrowUpRight, up: netTotal >= 0 },
  ];

  const recentTransactions = [...records]
    .filter(r => r.createdAt)
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
    .slice(0, 5)
    .map(r => ({
      desc: r.description || '—',
      amount: `${(r.amount || 0) >= 0 ? '+' : ''}$${(r.amount || 0).toLocaleString()}`,
      date: r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString() : '',
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white"> 💰 {t.revenue || 'Revenue'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, i) => (
          <div key={i} className="shams-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
              </div>
              <item.icon size={24} className="text-shams-400" />
            </div>
          </div>
        ))}
      </div>
      <div className="shams-card">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.length === 0 && !loading && (
            <p className="text-sm text-gray-500">
              {language === 'ar' ? 'لا توجد معاملات بعد' : 'No transactions yet'}
            </p>
          )}
          {recentTransactions.map((tx, i) => (
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
