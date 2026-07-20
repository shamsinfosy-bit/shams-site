import { useState } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { TrendingUp, Users, Eye, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// بيانات تجريبية
const viewsData = {
  day: [
    { name: '00:00', views: 400, users: 240 },
    { name: '04:00', views: 300, users: 139 },
    { name: '08:00', views: 2000, users: 980 },
    { name: '12:00', views: 2780, users: 390 },
    { name: '16:00', views: 1890, users: 480 },
    { name: '20:00', views: 2390, users: 380 },
  ],
  week: [
    { name: 'Mon', views: 4000, users: 2400 },
    { name: 'Tue', views: 3000, users: 1398 },
    { name: 'Wed', views: 2000, users: 9800 },
    { name: 'Thu', views: 2780, users: 3908 },
    { name: 'Fri', views: 1890, users: 4800 },
    { name: 'Sat', views: 2390, users: 3800 },
    { name: 'Sun', views: 3490, users: 4300 },
  ],
  month: [
    { name: 'Week 1', views: 12000, users: 8000 },
    { name: 'Week 2', views: 15000, users: 9500 },
    { name: 'Week 3', views: 18000, users: 11000 },
    { name: 'Week 4', views: 13500, users: 8700 },
  ],
  year: [
    { name: 'Jan', views: 40000, users: 24000 },
    { name: 'Mar', views: 55000, users: 32000 },
    { name: 'May', views: 60000, users: 38000 },
    { name: 'Jul', views: 70000, users: 45000 },
    { name: 'Sep', views: 65000, users: 42000 },
    { name: 'Nov', views: 80000, users: 50000 },
  ],
};

const trafficData = [
  { name: 'Social Media', value: 45 },
  { name: 'Search Engine', value: 30 },
  { name: 'Direct Visit', value: 15 },
  { name: 'Referral', value: 10 },
];

const COLORS = ['#c9a050', '#60a5fa', '#4ade80', '#f472b6'];

export default function Analytics() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const currentData = viewsData[timeRange];

  const stats = [
    { title: t.totalViews || 'Total Views', value: '248.5K', change: '+18.2%', icon: Eye, color: 'text-blue-400' },
    { title: t.activeUsers || 'Active Users', value: '45.2K', change: '+12.5%', icon: Users, color: 'text-green-400' },
    { title: t.revenue || 'Revenue', value: '$18,240', change: '+24.8%', icon: TrendingUp, color: 'text-emerald-400' },
    { title: t.activity || 'Avg. Time', value: '12m 35s', change: '+5.3%', icon: Clock, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">{t.analytics || 'Analytics'}</h1>
        <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1">
          {(['day', 'week', 'month', 'year'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                timeRange === range ? 'bg-shams-500 text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t[range] || range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="shams-card">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                <p className="text-xs text-green-400 mt-1">{stat.change}</p>
              </div>
              <stat.icon size={24} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="shams-card">
          <h3 className="text-lg font-semibold text-white mb-4">{t.trending || 'Views & Users Over Time'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#c9a050" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="users" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="shams-card">
          <h3 className="text-lg font-semibold text-white mb-4">{t.monthlyViews || 'Monthly Comparison'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="views" fill="#c9a050" radius={[4, 4, 0, 0]} />
              <Bar dataKey="users" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="shams-card">
          <h3 className="text-lg font-semibold text-white mb-4">{t.trafficSources || 'Traffic Sources'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={trafficData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" dataKey="value" label>
                {trafficData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Summary */}
        <div className="shams-card">
          <h3 className="text-lg font-semibold text-white mb-4">{t.recentActivity || 'Quick Summary'}</h3>
          <div className="space-y-4">
            {[
              { label: 'Top Video', value: 'Neon Horizons - 2.4M views' },
              { label: 'Best Day', value: 'Sunday - 3,490 views' },
              { label: 'Peak Hour', value: '8:00 PM - 1,200 active users' },
              { label: 'Conversion Rate', value: '12.5%' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
