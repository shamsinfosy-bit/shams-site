import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, DollarSign, Video, Eye } from 'lucide-react'
import { useAppStore, useUserStore } from '../../store'
import { translations } from '../../i18n/translations'
import { getUsers, getContent, getRevenue } from '../../services/firestore'

const trafficData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 200 },
  { name: 'Organic', value: 100 },
]

const COLORS = ['#c9a050', '#60a5fa', '#4ade80', '#f472b6']

export default function Dashboard() {
  const language = useAppStore(s => s.language)
  const isDirector = useUserStore(s => s.isDirector)
  const t = translations[language]

  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalContent, setTotalContent] = useState(0)
  const [totalViews, setTotalViews] = useState(0)
  const [revenue, setRevenue] = useState(0)
  const [recentActivity, setRecentActivity] = useState<{ title: string; time: string }[]>([])

  useEffect(() => {
    let cancelled = false

    async function loadDashboardData() {
      try {
        const [users, content] = await Promise.all([
          getUsers(),
          getContent(),
        ])

        if (cancelled) return

        setTotalUsers(users.length)
        setActiveUsers(users.filter((u: any) => u.status !== 'frozen').length)
        setTotalContent(content.length)
        setTotalViews(
          content.reduce((sum: number, c: any) => sum + (c.views || 0), 0)
        )

        const sortedContent = [...content]
          .filter((c: any) => c.updatedAt)
          .sort((a: any, b: any) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0))
          .slice(0, 4)
          .map((c: any) => ({
            title: c.title || c.name || 'Untitled',
            time: c.updatedAt?.toDate
              ? c.updatedAt.toDate().toLocaleString()
              : '',
          }))
        setRecentActivity(sortedContent)

        if (isDirector()) {
          const revenueDocs = await getRevenue()
          const total = revenueDocs.reduce(
            (sum: number, r: any) => sum + (r.amount || 0),
            0
          )
          if (!cancelled) setRevenue(total)
        }
      } catch (err) {
        console.error('Dashboard load error:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadDashboardData()
    return () => { cancelled = true }
  }, [])

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
    { title: t.totalViews,   value: loading ? '...' : totalViews.toLocaleString(),   icon: Eye,   color: 'text-blue-400'    },
    { title: t.activeUsers,  value: loading ? '...' : activeUsers.toLocaleString(),  icon: Users, color: 'text-green-400'   },
    ...(isDirector()
      ? [{ title: t.revenue, value: loading ? '...' : `$${revenue.toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400' }]
      : []),
    { title: t.videos,       value: loading ? '...' : totalContent.toLocaleString(), icon: Video, color: 'text-purple-400'  },
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
                </div>
                <stat.icon size={24} className={stat.color} />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <div className="shams-card">
            <h3 className="text-lg font-semibold text-white mb-4">{t.recentActivity}</h3>
            <div className="space-y-3">
              {recentActivity.length === 0 && !loading && (
                <p className="text-sm text-gray-500">{isRTLPlaceholder(language)}</p>
              )}
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="text-sm text-white">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function isRTLPlaceholder(language: string) {
  return language === 'ar' ? 'لا يوجد نشاط بعد' : 'No activity yet'
}
