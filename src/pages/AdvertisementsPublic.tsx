import { useAppStore } from '../store';
import { Megaphone } from 'lucide-react';

export default function AdvertisementsPublic() {
  const language = useAppStore((s: any) => s.language);
  const isRTL = language === 'ar';

  return (
    <main
      className="min-h-screen bg-[#050912] p-6 text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center gap-3">
          <Megaphone className="text-shams-400" size={30} />
          <h1 className="text-3xl font-bold">
            {isRTL ? 'الإعلانات والعروض' : 'Advertisements & Offers'}
          </h1>
        </div>

        <p className="mb-8 text-gray-400">
          {isRTL
            ? 'مساحة الإعلانات والعروض على شمس.'
            : 'The advertisements and offers space on SHAMS.'}
        </p>

        <section className="rounded-2xl border border-gray-800 bg-gray-900/70 p-8 text-center">
          <Megaphone size={42} className="mx-auto mb-4 text-shams-400" />
          <h2 className="mb-2 text-xl font-semibold">
            {isRTL ? 'لا توجد إعلانات منشورة حاليًا' : 'No published advertisements yet'}
          </h2>
          <p className="text-gray-400">
            {isRTL
              ? 'ستظهر الإعلانات هنا عندما يتوفر محتوى منشور ومعتمد.'
              : 'Advertisements will appear here when approved and published content is available.'}
          </p>
        </section>
      </div>
    </main>
  );
}
