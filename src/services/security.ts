// ============================================
// SHAMS Security System
// ============================================

// XSS Protection - Sanitize input
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Sanitize URL
export function sanitizeURL(url: string): string {
  const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
  if (!pattern.test(url)) return '';
  return encodeURI(url);
}

// CSRF Token Generator
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Validate Email
export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate Password Strength
export function validatePassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) return { valid: false, message: 'Password must be at least 8 characters' };
  if (!/[A-Z]/.test(password)) return { valid: false, message: 'Password must contain uppercase letter' };
  if (!/[a-z]/.test(password)) return { valid: false, message: 'Password must contain lowercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, message: 'Password must contain a number' };
  return { valid: true, message: 'Strong password' };
}

// Rate Limiter (in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) return false;
  
  record.count++;
  return true;
}

// ===== نظام حظر تسجيل الدخول =====
interface LoginBan {
  count: number;
  windowStart: number;
  bannedUntil: number;
}

const loginBanMap = new Map<string, LoginBan>();

export function checkLoginRateLimit(key: string = 'global'): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const record = loginBanMap.get(key);
  
  // إذا كان هناك حظر نشط
  if (record && record.bannedUntil > now) {
    const retryAfter = Math.ceil((record.bannedUntil - now) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }
  
  // إذا لم يكن هناك سجل أو انتهت فترة الحظر
  if (!record || now > record.windowStart + 60000) {
    loginBanMap.set(key, { count: 1, windowStart: now, bannedUntil: 0 });
    return { allowed: true, remaining: 49 };
  }
  
  // إذا تجاوز الحد (50 محاولة في الدقيقة)
  if (record.count >= 50) {
    const bannedUntil = now + 12 * 60 * 1000; // 12 دقيقة
    loginBanMap.set(key, { ...record, bannedUntil });
    return { allowed: false, remaining: 0, retryAfter: 12 * 60 };
  }
  
  // زيادة العداد
  record.count++;
  return { allowed: true, remaining: 50 - record.count };
}

// Security Headers
export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https: data:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.youtube.com https://*.facebook.com https://*.instagram.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// Bot Detection
export function detectBot(userAgent: string): boolean {
  const botPatterns = [
    'bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python', 'java',
    'go-http', 'node-fetch', 'axios', 'httpclient',
  ];
  const ua = userAgent.toLowerCase();
  return botPatterns.some(pattern => ua.includes(pattern));
}

// Audit Log
interface AuditEntry {
  timestamp: string;
  action: string;
  ip: string;
  userAgent: string;
  status: 'success' | 'blocked' | 'error';
}

const auditLog: AuditEntry[] = [];

export function logAudit(entry: Omit<AuditEntry, 'timestamp'>) {
  auditLog.push({
    ...entry,
    timestamp: new Date().toISOString(),
  });
  if (auditLog.length > 1000) auditLog.shift();
}

export function getAuditLog(): AuditEntry[] {
  return [...auditLog];
}

// IP Validation
export function validateIP(ip: string): boolean {
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4.test(ip);
}

// Blocked IPs (blacklist)
const blockedIPs = new Set<string>();

export function blockIP(ip: string) {
  blockedIPs.add(ip);
}

export function unblockIP(ip: string) {
  blockedIPs.delete(ip);
}

export function isIPBlocked(ip: string): boolean {
  return blockedIPs.has(ip);
}

// Session Validation
export function validateSession(token: string | null): boolean {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default {
  sanitizeInput,
  sanitizeURL,
  generateCSRFToken,
  validateEmail,
  validatePassword,
  rateLimit,
  checkLoginRateLimit,
  securityHeaders,
  detectBot,
  logAudit,
  getAuditLog,
  validateIP,
  blockIP,
  unblockIP,
  isIPBlocked,
  validateSession,
};
