import { useEffect, useMemo, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Clock, ExternalLink } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';
import LangSwitch from '../../components/LangSwitch';

interface NewsItem {
  id: string;
  title: string;
  link: string;
  source: string;
  lang: string;
  publishedAt?: { toMillis: () => number };
}

export default function News() {
  const language = useAppStore((s) => s.language);
  const t = translations[language];
  const tr = (ar: string, en: string, ru: string, fr: string) =>
    language === 'ar' ? ar : language === 'ru' ? ru : language === 'fr' ? fr : en;

  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allLangs, setAllLangs] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, 'news'), orderBy('publishedAt', 'desc'), limit(150)));
        if (cancelled) return;
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<NewsItem, 'id'>) })));
      } catch (e) {
        console.error('news load failed', e);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const shown = useMemo(
    () => (allLangs ? items : items.filter((n) => n.lang === language)),
    [items, allLangs, language]
  );

  const ago = (n: NewsItem) => {
    if (!n.publishedAt) return '';
    const mins = Math.round((Date.now() - n.publishedAt.toMillis()) / 60000);
    const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });
    if (mins < 60) return rtf.format(-Math.max(mins, 1), 'minute');
    if (mins < 60 * 24) return rtf.format(-Math.round(mins / 60), 'hour');
    return rtf.format(-Math.round(mins / 1440), 'day');
  };

  return (
    <FeatureGate feature="news" fallback={<FeatureComingSoon label={t.news || 'News'} />}>
      <div className="space-y-6 p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex justify-end">
          <LangSwitch />
        </div>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-2xl font-bold text-white">📰 {t.news || 'News'}</h1>
          <button
            onClick={() => setAllLangs(!allLangs)}
            className="text-sm px-3 py-1.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition"
          >
            {allLangs
              ? tr('لغتي فقط', 'My language only', 'Только мой язык', 'Ma langue seulement')
              : tr('كل اللغات', 'All languages', 'Все языки', 'Toutes les langues')}
          </button>
        </div>

        {loading && (
          <p className="text-gray-400 text-center py-10">{tr('جارٍ التحميل...', 'Loading...', 'Загрузка...', 'Chargement...')}</p>
        )}
        {error && (
          <p className="text-red-400 text-center py-10">
            {tr('تعذر تحميل الأخبار الآن', 'Could not load news right now', 'Не удалось загрузить новости', 'Impossible de charger les actualités')}
          </p>
        )}
        {!loading && !error && shown.length === 0 && (
          <p className="text-gray-400 text-center py-10">
            {tr('لا توجد أخبار بهذه اللغة الآن', 'No news in this language yet', 'Пока нет новостей на этом языке', "Pas encore d'actualités dans cette langue")}
          </p>
        )}

        <div className="space-y-4">
          {shown.map((n) => (
            <a
              key={n.id}
              href={n.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shams-card flex items-start gap-4 block hover:border-shams-500/30 transition"
            >
              <div className="flex-1 min-w-0">
                <span className="text-xs text-shams-400 font-semibold">{n.source}</span>
                <h3 dir="auto" className="text-white font-semibold mt-1">{n.title}</h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <Clock size={12} /> {ago(n)}
                </div>
              </div>
              <ExternalLink size={16} className="text-gray-600 flex-shrink-0 mt-1" />
            </a>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-800">
          {tr(
            'نعرض العناوين فقط، والضغط على الخبر ينقلك إلى موقع المصدر الأصلي.',
            'We show headlines only. Tapping a story opens the original publisher’s website.',
            'Мы показываем только заголовки. Нажатие открывает сайт первоисточника.',
            "Nous n'affichons que les titres. Un clic ouvre le site de l'éditeur d'origine."
          )}
        </p>
      </div>
    </FeatureGate>
  );
}
