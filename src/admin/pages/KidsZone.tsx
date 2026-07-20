import { useAppStore } from '../../store';
import { Star, Play, Lock } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const content = [
  { id: 1, title: 'Cartoon Adventures', titleAr: 'مغامرات الكرتون', age: '3+', emoji: '🦁' },
  { id: 2, title: 'Learn with Fun', titleAr: 'تعلم مع المرح', age: '5+', emoji: '📚' },
  { id: 3, title: 'Fairy Tales', titleAr: 'حكايات خرافية', age: '4+', emoji: '🧚' },
  { id: 4, title: 'Science for Kids', titleAr: 'علوم للأطفال', age: '7+', emoji: '🔬' },
  { id: 5, title: 'Music & Dance', titleAr: 'موسيقى ورقص', age: '3+', emoji: '🎵' },
  { id: 6, title: 'Drawing Time', titleAr: 'وقت الرسم', age: '5+', emoji: '🎨' },
];

export default function KidsZone() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';
  return (
    <FeatureGate feature="kidsZone" fallback={<FeatureComingSoon label={isRTL ? 'منطقة الأطفال' : 'Kids Zone'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">👶</span>
          <div>
            <h1 className="text-2xl font-bold text-white">{isRTL ? 'منطقة الأطفال' : 'Kids Zone'}</h1>
            <p className="text-xs text-gray-400 mt-0.5">{isRTL ? 'محتوى آمن ومناسب للأطفال' : 'Safe & age-appropriate content'}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
            <Lock size={12} />
            {isRTL ? 'محتوى آمن' : 'Safe Content'}
          </div>
        </div>

        <div className="rounded-2xl p-6 bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-blue-500/20 border border-white/10">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🌟</div>
            <div>
              <h2 className="text-xl font-bold text-white">{isRTL ? 'مرحباً بالأبطال الصغار!' : 'Welcome Little Heroes!'}</h2>
              <p className="text-gray-300 text-sm mt-1">{isRTL ? 'اختر ما تريد مشاهدته اليوم' : 'Choose what you want to watch today'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.map((item) => {
            const title = isRTL ? item.titleAr : item.title;
            return (
              <button key={item.id} className="shams-card p-0 overflow-hidden group hover:border-shams-500/50 transition-all text-left w-full">
                <div className="bg-gray-800/50 p-6 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white">{title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star size={10} fill="currentColor" /> {item.age}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-shams-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <Play size={12} className="text-shams-400 ml-0.5" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="shams-card flex items-start gap-3 border-blue-500/20 bg-blue-500/5">
          <Lock size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-400">{isRTL ? 'رقابة الوالدين' : 'Parental Controls'}</p>
            <p className="text-xs text-gray-400 mt-1">{isRTL ? 'جميع المحتويات مراجعة ومعتمدة للأطفال.' : 'All content is reviewed and approved for children.'}</p>
          </div>
        </div>
      </div>
    </FeatureGate>
  );
}
