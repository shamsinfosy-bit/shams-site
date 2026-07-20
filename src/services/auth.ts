import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE  = 'service_q4t4lvl';
const EMAILJS_TEMPLATE = 'service_xdshvpe';
const EMAILJS_PUBLIC   = 'NcID4EbQo8_6KfB0i';

export function generateVerificationCode(): string {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(100000 + (array[0] % 900000));
}

export async function sendVerificationEmail(email: string, code: string): Promise<boolean> {
  try {
    await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { to_email: email, code }, EMAILJS_PUBLIC);
    return true;
  } catch { return false; }
}
