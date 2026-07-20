# SHAMS - أساسيات العمل

## 🏗️ أي صفحة جديدة يجب أن تحتوي على:

1. import useAppStore from '../store'
2. import translations from '../i18n/translations'
3. const language = useAppStore(s => s.language)
4. const t = translations[language]
5. كل النصوص = {t.key} أو content[language]
6. dir={language === 'ar' ? 'rtl' : 'ltr'}
7. ألوان: #c9a050 (ذهبي) / #06060c (داكن)
8. استخدام lucide-react للأيقونات
9. تصميم responsive
10. إضافة الصفحة في Router.tsx

## 🛡️ الحماية
- CSRF Token
- Input Sanitization
- Rate Limiting
- Bot Detection
- Audit Logging

## 🔗 المنصات المدعومة
- YouTube | Facebook | Instagram | Telegram | Twitter/X | TikTok

## 👥 نظام المستخدمين
- Director: كامل الصلاحيات
- Admin: إدارة محتوى + Dashboard + Settings
- User: مشاهدة + رفع

## 📂 الصفحات
✅ Home | Login | Explore | Watch | Upload | Dashboard | Radio | AI Studio | Audit Log
❌ Kids World | Console | Manager | Library | About | Contact | Profile | Settings
