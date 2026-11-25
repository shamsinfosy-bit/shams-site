import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useAppStore } from '../store';

const LANGS = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'fr', label: 'Français' },
] as const;

export default function LangSwitch() {
  const language = useAppStore((s: any) => s.language);
  const setLanguage = useAppStore((s: any) => s.setLanguage);
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Language"
        className="flex items-center gap-1 text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition"
      >
        <Globe size={18} />
        <span className="text-xs uppercase">{language}</span>
      </button>
      {open && (
        <div className="absolute end-0 mt-2 z-50 min-w-[140px] rounded-xl border border-gray-700 bg-gray-900 shadow-xl overflow-hidden">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLanguage(l.code); setOpen(false); }}
              className={`block w-full text-start px-4 py-2 text-sm hover:bg-gray-800 ${language === l.code ? 'text-amber-400' : 'text-white'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
