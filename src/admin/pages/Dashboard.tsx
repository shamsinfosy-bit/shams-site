import { Helmet } from 'react-helmet-async'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, DollarSign, Video, Eye } from 'lucide-react'
import { useAppStore } from '../../store'
import { translations } from '../../i18n/translations'

const monthlyData = [
  { name: 'Jan', views: 4000, users: 2400 },
  { name: 'Feb', views: 3000, users: 1398 },
  { name: 'Mar', views: 2000, users: 9800 },
  { name: 'Apr', views: 2780, users: 3908 },
  { name: 'May', views: 1890, users: 4800 },
  { name: 'Jun', views: 2390, users: 3800 },
  { name: 'Jul', views: 3490, users: 4300 },
]

const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 200 },
  { name: 'Organic', value: 100 },
]

const COLORS = ['#c9a050', '#60a5fa', '#4ade80', '#f472b6']

export default function Dashboard() {
  const language = useAppStore(s => s.language)
  const t = translations[language]
  
  // دعم اللغات الأربع لبيانات SEO
  const seoData = {
    title: {
      ar: 'شامس - لوحة التحكم الذكية',
      en: 'SHAMS - Intelligent Media Dashboard',
      fr: 'SHAMS - Tableau de bord intelligent',
      ru: 'SHAMS - Интеллектуальная панель управления'
    },
    description: {
      ar: 'لوحة تحليلات وإدارة المحتوى لمنصة شامس الإعلامية الذكية.',
      en: 'SHAMS intelligent media platform analytics and content management dashboard.',
      fr: 'Tableau de bord d\'analyse et de gestion de contenu de la plateforme médiatique intelligente SHAMS.',
      ru: 'Панель аналитики и управления контентом интеллектуальной медиа-платформы SHAMS.'
    }
  }

  const currentLang = language || 'en'

  const stats = [
    { title: t.totalViews, value: '2.4M', change: '+12.5%', icon: Eye, color: 'text-blue-400' },
    { title: t.activeUsers, value: '45.2K', change: '+8.2%', icon: Users, color: 'text-green-400' },
    { title: t.revenue, value: '$12,450', change: '+23.1%', icon: DollarSign, color: 'text-emerald-400' },
    { title: t.videos, value: '1,230', change: '+4.7%', icon: Video, color: 'text-purple-400' },
  ]

  return (
    <>
      <Helmet>
        <title>{seoData.title[currentLang]}</title>
        <meta name="description" content={seoData.description[currentLang]} />
        <meta property="og:title" content={seoData.title[currentLang]} />
        <meta property="og:description" content={seoData.description[currentLang]} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shamsinfosy-bit.github.io/shams-site" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="keywords" content="شامس, SHAMS, منصة إعلامية, ذكاء اصطناعي, لوحة تحكم, media platform, AI, dashboard" />
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">{t.dashboard}</h1>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="shams-card">
            <h3 className="text-lg font-semibold text-white mb-4">{t.monthlyViews}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="views" fill="#c9a050" radius={[4, 4, 0, 0]} />
                <Bar dataKey="users" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="shams-card">
            <h3 className="text-lg font-semibold text-white mb-4">{t.trafficSources}</h3>
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
        </div>
        <div className="shams-card">
          <h3 className="text-lg font-semibold text-white mb-4">{t.recentActivity}</h3>
          <div className="space-y-3">
            {[
              { action: t.newVideoUploaded, time: '2 min ago', user: 'John' },
              { action: t.userRegistration, time: '15 min ago', user: 'Sarah' },
              { action: t.revenueThreshold, time: '1 hour ago', user: 'System' },
              { action: t.contentFlagged, time: '3 hours ago', user: 'Moderator' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div>
                  <p className="text-sm text-white">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.time} by {item.user}</p>
                </div>
                <span className="text-xs text-shams-400">{t.view}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
