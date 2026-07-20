# SHAMS - Intelligent Media Platform

## 🏗️ الهندسة المعمارية (Architecture)

### القاعدة الذهبية:
- **فرع main:** هو النسخة المستقرة المنشورة على GitHub Pages (لا نلمسه إلا بعد الاختبار).
- **فرع develop:** هو بيئة التطوير (نجرب هنا كل الميزات الجديدة).

## 📂 هيكل المجلدات المقترح للتوسع:
- **src/admin/pages/:** الصفحات الأساسية (Dashboard, Users, AI Studio, KidsZone...).
- **src/components/:** المكونات المشتركة (FeatureGate, UI...).
- **src/services/:** الاتصال بقواعد البيانات (Firebase, featureFlags...).
- **src/hooks/:** دوال React المخصصة.

## 🛡️ نظام الحماية:
- استعادة محلية: `~/restore_stable.sh`
- استعادة بعيدة: `git checkout stable-v1` أو `git clone -b source`

## 🚀 أمر النشر الآمن:
```bash
cd ~/project && npm run build && rm -rf ~/shams-site && mkdir -p ~/shams-site && cp -r dist/* ~/shams-site/ && cp ~/shams-site/index.html ~/shams-site/404.html && cd ~/shams-site && git add . && git commit -m 'Stable update' && git push origin main
```

