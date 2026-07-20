import { useState } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Mail, Send } from 'lucide-react';

export default function Contact() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-shams-400 mb-6">📧 {t.contact || 'Contact'}</h1>
      {sent ? (
        <div className="bg-green-900/20 border border-green-500/20 rounded-xl p-6 text-center text-green-400">
          ✅ Message sent!
        </div>
      ) : (
        <div className="space-y-4 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <input placeholder={t.name} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <input placeholder={t.email} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white" />
          <button onClick={() => setSent(true)} className="shams-btn-primary w-full flex items-center justify-center gap-2">
            <Send size={18} /> Send
          </button>
        </div>
      )}
    </div>
  );
}
