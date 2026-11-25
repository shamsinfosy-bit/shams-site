import { useAppStore } from '../store';
import { Film, Play } from 'lucide-react';

export default function Reels() {
  const language = useAppStore((s: any) => s.language);
  const isRTL = language === 'ar';

  return (
    <main className="min-h-screen bg-[#050912] text-white p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <Film className="text-shams-400" size={30} />
          <h1 className="text-3xl font-bold">
            {isRTL ? 'الريلز' : 'Reels'}
          </h1>
        </div>
        <p className="text-gray-400 mb-8">
          {isRTL
            ? 'الفيديوهات القصيرة ستظهر هنا عند إضافة محتوى ريلز معتمد.'
            : 'Short videos will appear here when approved reels content is added.'}
        </p>
        <section className="rounded-2xl border border-gray-800 bg-gray-900/70 p-10 text-center">
          <Play size={42} className="mx-auto mb-4 text-shams-400" />
          <h2 className="text-xl font-semibold mb-2">
            {isRTL ? 'قريبًا على شمس' : 'Coming soon to SHAMS'}
          </h2>
          <p className="text-gray-400">
            {isRTL
              ? 'نعمل على تجهيز تجربة مشاهدة الفيديوهات القصيرة.'
              : 'We are preparing the short-video viewing experience.'}
          </p>
        </section>
      </div>
    </main>
  );
}
