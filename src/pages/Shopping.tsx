import { useEffect, useMemo, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAppStore } from '../store';
import { FeatureGate, FeatureComingSoon } from '../components/FeatureGate';
import { ShoppingBag, Star, ExternalLink, Search } from 'lucide-react';
import LangSwitch from '../components/LangSwitch';

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  originalPrice: number | null;
  discountPercent: number;
  currency: string;
  sales180Day: number;
  positiveFeedback: number | null;
  affiliateUrl: string;
  couponCode?: string;
  couponValue?: number | null;
  active?: boolean;
}

const PAGE_SIZE = 24;

export default function Shopping() {
  const language = useAppStore((s: any) => s.language);
  const tr = (ar: string, en: string, ru: string, fr: string) =>
    language === 'ar' ? ar : language === 'ru' ? ru : language === 'fr' ? fr : en;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(200))
        );
        if (cancelled) return;
        const list = snap.docs
          .map((d) => ({ id: d.id, ...(d.data() as Omit<Product, 'id'>) }))
          .filter((p) => p.active !== false && p.affiliateUrl)
          .sort((a, b) => (b.sales180Day || 0) - (a.sales180Day || 0));
        setProducts(list);
      } catch (e) {
        console.error('products load failed', e);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? products.filter((p) => p.title.toLowerCase().includes(q)) : products;
  }, [products, search]);

  const money = (n: number, cur: string) => (cur === 'USD' ? '$' : cur + ' ') + n.toFixed(2);

  return (
    <FeatureGate feature="shopping" fallback={<FeatureComingSoon label="Shopping" />}>
      <div className="space-y-6 p-4">
        <div className="flex justify-end"><LangSwitch /></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              🛍️ {tr('تسوق مع شمس', 'Shop with Shams', 'Покупки с Шамс', 'Boutique Shams')}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {tr(
                'عروض مختارة من AliExpress بأسعار مخفضة',
                'Selected AliExpress deals at reduced prices',
                'Избранные предложения AliExpress со скидкой',
                'Offres AliExpress sélectionnées à prix réduit'
              )}
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-500 absolute top-1/2 -translate-y-1/2 start-3" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              placeholder={tr('ابحث عن منتج (بالإنجليزية)', 'Search products', 'Поиск товаров', 'Rechercher')}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl ps-9 pe-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {loading && (
          <p className="text-gray-400 text-center py-10">{tr('جارٍ التحميل...', 'Loading...', 'Загрузка...', 'Chargement...')}</p>
        )}
        {error && (
          <p className="text-red-400 text-center py-10">
            {tr('تعذر تحميل المنتجات الآن', 'Could not load products right now', 'Не удалось загрузить товары', 'Impossible de charger les produits')}
          </p>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-gray-400 text-center py-10">{tr('لا توجد منتجات', 'No products found', 'Товары не найдены', 'Aucun produit')}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.slice(0, visible).map((p) => {
            const stars = p.positiveFeedback ? Math.max(1, Math.min(5, Math.round(p.positiveFeedback / 20))) : 0;
            return (
              <div key={p.id} className="shams-card overflow-hidden flex flex-col justify-between border border-gray-800 rounded-xl bg-gray-900/50">
                <div>
                  <div className="aspect-square bg-white relative overflow-hidden">
                    <img src={p.imageUrl} alt={p.title} loading="lazy" className="w-full h-full object-contain" />
                  </div>
                  <div className="p-3 space-y-2">
                    <h3 dir="ltr" className="text-sm font-semibold text-white line-clamp-2 text-start">{p.title}</h3>
                    {stars > 0 && (
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                        <span className="text-xs text-gray-400 ms-1">{p.positiveFeedback}%</span>
                      </div>
                    )}
                    {p.sales180Day > 0 && (
                      <p className="text-xs text-gray-500">
                        {tr('تم بيع', 'Sold', 'Продано', 'Vendus')} {p.sales180Day.toLocaleString()}+
                      </p>
                    )}
                    {p.couponCode && (
                      <p className="text-xs text-green-400">
                        {tr('كوبون', 'Coupon', 'Купон', 'Coupon')}: {p.couponCode}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-3 pt-0 mt-auto">
                  <div className="mb-2">
                    <span className="text-xl font-black text-amber-400">
                      {money(p.originalPrice && p.originalPrice > p.price ? p.originalPrice : p.price, p.currency)}
                    </span>
                    {p.originalPrice && p.originalPrice > p.price && (
                      <p className="text-xs text-green-400 mt-1">
                        {tr('عروض قد تخفض السعر حتى', 'Deals may lower this to', 'Скидки могут снизить цену до', 'Des offres peuvent baisser le prix jusqu’à')} {money(p.price, p.currency)}
                        <span className="text-gray-500"> {tr('(تختلف حسب الحساب والبلد)', '(varies by account and country)', '(зависит от аккаунта и страны)', '(selon le compte et le pays)')}</span>
                      </p>
                    )}
                  </div>
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl font-medium bg-amber-500 hover:bg-amber-400 text-gray-950 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {tr('اشترِ الآن', 'Buy now', 'Купить', 'Acheter')}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {visible < filtered.length && (
          <div className="text-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="px-6 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white hover:bg-gray-700"
            >
              {tr('عرض المزيد', 'Show more', 'Показать ещё', 'Voir plus')}
            </button>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-800">
          {tr(
            'الأسعار تقريبية وقد تختلف عند الشراء. بعض الروابط في هذه الصفحة روابط إحالة، وقد نحصل على عمولة عند الشراء دون أي تكلفة إضافية عليك.',
            'Prices are approximate and may differ at checkout. Some links on this page are affiliate links. We may earn a commission on purchases at no extra cost to you.',
            'Цены приблизительные и могут отличаться при покупке. Некоторые ссылки на этой странице партнёрские: мы можем получать комиссию без дополнительных затрат для вас.',
            "Les prix sont approximatifs et peuvent varier à l’achat. Certains liens sur cette page sont des liens d'affiliation : nous pouvons percevoir une commission sans frais supplémentaires pour vous."
          )}
        </p>
      </div>
    </FeatureGate>
  );
}
