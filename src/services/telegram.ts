const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? '';

export async function sendTelegramOTP(chatId: string, code: string): Promise<boolean> {
  if (!BOT_TOKEN) { console.error('[Telegram] Bot token not configured'); return false; }
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: `🔐 SHAMS Code: ${code}\n\nExpires in 5 minutes.` }),
    });
    return res.ok;
  } catch { return false; }
}

export function generateOTP(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(100000 + (array[0] % 900000));
}
