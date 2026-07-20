import { useState } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Sparkles, Send, Copy, RefreshCw, FileText, Music, Video, Image } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

type Tool = 'text' | 'music' | 'video' | 'image';

const TOOLS: { id: Tool; icon: React.ElementType; en: string; ar: string }[] = [
  { id: 'text',  icon: FileText, en: 'Content Writer',  ar: 'كاتب المحتوى'  },
  { id: 'music', icon: Music,    en: 'Music Generator', ar: 'مولّد الموسيقى' },
  { id: 'video', icon: Video,    en: 'Video Ideas',     ar: 'أفكار الفيديو'  },
  { id: 'image', icon: Image,    en: 'Image Prompt',    ar: 'وصف الصورة'     },
];

const SUGGESTIONS: Record<Tool, { en: string; ar: string }[]> = {
  text:  [
    { en: 'Write a social media post about...',    ar: 'اكتب منشور سوشيال ميديا عن...' },
    { en: 'Create a video script for...',          ar: 'أنشئ سكريبت فيديو عن...'        },
    { en: 'Write SEO description for...',          ar: 'اكتب وصف SEO لـ...'              },
  ],
  music: [
    { en: 'Generate lo-fi background music',       ar: 'أنشئ موسيقى lo-fi للخلفية'      },
    { en: 'Create upbeat intro music',             ar: 'أنشئ موسيقى مقدمة نشيطة'        },
    { en: 'Ambient sound for documentary',         ar: 'أصوات هادئة للوثائقي'            },
  ],
  video: [
    { en: 'Top 10 ideas for tech channel',         ar: 'أفضل 10 أفكار لقناة تقنية'      },
    { en: 'Trending video topics this week',       ar: 'مواضيع فيديو رائجة هذا الأسبوع'  },
    { en: 'Viral short video concepts',            ar: 'أفكار فيديوهات قصيرة فيروسية'   },
  ],
  image: [
    { en: 'Cinematic poster for sci-fi movie',     ar: 'بوستر سينمائي لفيلم خيال علمي'  },
    { en: 'Thumbnail for YouTube video',           ar: 'صورة مصغرة ليوتيوب'             },
    { en: 'Logo design prompt for media brand',    ar: 'وصف تصميم شعار لعلامة إعلامية'  },
  ],
};

export default function AIStudio() {
  const language = useAppStore((s) => s.language);
  const t = translations[language];
  const isRTL = language === 'ar';

  const [activeTool, setActiveTool] = useState<Tool>('text');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setResult('');
    // محاكاة استجابة AI (سيُستبدل بـ API حقيقي لاحقاً)
    await new Promise((r) => setTimeout(r, 1500));
    const responses: Record<Tool, string> = {
      text: `✍️ ${isRTL ? 'نتيجة كاتب المحتوى' : 'Content Writer Result'}:\n\n${prompt}\n\n${isRTL ? 'هذا محتوى تجريبي سيُستبدل بنتيجة حقيقية من نموذج الذكاء الاصطناعي عند ربط API.' : 'This is a demo result that will be replaced with real AI output when API is connected.'}`,
      music: `🎵 ${isRTL ? 'وصف الموسيقى المولّدة' : 'Generated Music Description'}:\n\nBPM: 120 | Key: C Major | Genre: ${prompt}\n\n${isRTL ? 'سيتم توليد الملف الصوتي عند ربط نموذج الذكاء الاصطناعي.' : 'Audio file will be generated when AI model is connected.'}`,
      video: `🎬 ${isRTL ? 'أفكار الفيديو' : 'Video Ideas'}:\n\n1. ${prompt} - Part 1\n2. ${prompt} - Behind the scenes\n3. ${prompt} - Tips & Tricks\n4. ${prompt} - Q&A Session\n5. ${prompt} - Full Tutorial`,
      image: `🖼️ ${isRTL ? 'وصف الصورة' : 'Image Prompt'}:\n\n"${prompt}, cinematic lighting, 8K resolution, professional photography, golden hour, SHAMS media style, ultra-detailed"`,
    };
    setResult(responses[activeTool]);
    setLoading(false);
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <FeatureGate feature="aiStudio" fallback={<FeatureComingSoon label={isRTL ? 'استوديو AI' : 'AI Studio'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="flex items-center gap-3">
          <Sparkles size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">
            {isRTL ? 'استوديو الذكاء الاصطناعي' : 'AI Studio'}
          </h1>
          <span className="text-xs bg-shams-500/20 text-shams-400 border border-shams-500/30 px-2 py-0.5 rounded-full font-bold">
            BETA
          </span>
        </div>

        {/* أدوات AI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => { setActiveTool(tool.id); setPrompt(''); setResult(''); }}
                className={`shams-card flex items-center gap-3 p-4 transition-all ${isActive ? 'border-shams-500/50 bg-shams-500/5' : ''}`}
              >
                <Icon size={20} className={isActive ? 'text-shams-400' : 'text-gray-400'} />
                <span className={`text-sm font-medium ${isActive ? 'text-shams-400' : 'text-gray-300'}`}>
                  {isRTL ? tool.ar : tool.en}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* منطقة الإدخال */}
          <div className="space-y-4">
            <div className="shams-card space-y-3">
              <label className="text-sm font-semibold text-shams-400 uppercase tracking-wider">
                {isRTL ? 'أدخل طلبك' : 'Your Prompt'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={isRTL ? 'اكتب ما تريد إنشاؤه...' : 'Describe what you want to create...'}
                rows={5}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-shams-500 transition"
              />
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className="w-full shams-btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <><RefreshCw size={16} className="animate-spin" /> {isRTL ? 'جاري التوليد...' : 'Generating...'}</>
                  : <><Send size={16} /> {isRTL ? 'توليد' : 'Generate'}</>
                }
              </button>
            </div>

            {/* اقتراحات */}
            <div className="shams-card space-y-2">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                {isRTL ? 'اقتراحات' : 'Suggestions'}
              </p>
              {SUGGESTIONS[activeTool].map((s, i) => (
                <button
                  key={i}
                  onClick={() => setPrompt(isRTL ? s.ar : s.en)}
                  className="w-full text-right rtl:text-right ltr:text-left text-sm text-gray-400 hover:text-shams-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
                >
                  {isRTL ? s.ar : s.en}
                </button>
              ))}
            </div>
          </div>

          {/* منطقة النتيجة */}
          <div className="shams-card space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-shams-400 uppercase tracking-wider">
                {isRTL ? 'النتيجة' : 'Result'}
              </label>
              {result && (
                <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition">
                  <Copy size={14} />
                  {copied ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ' : 'Copy')}
                </button>
              )}
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-48">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-shams-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">{isRTL ? 'جاري التفكير...' : 'Thinking...'}</p>
                </div>
              </div>
            ) : result ? (
              <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed font-sans min-h-48">
                {result}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-600 text-sm">
                {isRTL ? 'ستظهر النتيجة هنا' : 'Result will appear here'}
              </div>
            )}
          </div>
        </div>
      </div>
    </FeatureGate>
  );
}
