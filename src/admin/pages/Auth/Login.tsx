import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../../../store';
import { Language } from '../../../i18n/translations';
import { auth } from '../../../services/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { Eye, EyeOff, Sun } from 'lucide-react';

const ADMIN_EMAILS = [
  'director@shams.com',
  'shamsinfosy@gmail.com',
  'deputy@shams.com',
  'admin@shams.com',
];

const ERRORS: Record<string, Record<string, string>> = {
  'auth/user-not-found': {
    en: 'No account found. Please register.',
    ar: 'الحساب غير موجود. سجّل أولاً.',
    fr: 'Compte introuvable.',
    ru: 'Аккаунт не найден.',
    tr: 'Hesap bulunamadı. Lütfen önce kayıt olun.',
  },
  'auth/wrong-password': {
    en: 'Wrong password.',
    ar: 'كلمة المرور خاطئة.',
    fr: 'Mot de passe incorrect.',
    ru: 'Неверный пароль.',
    tr: 'Şifre yanlış.',
  },
  'auth/invalid-credential': {
    en: 'Wrong email or password.',
    ar: 'البريد أو كلمة المرور خاطئة.',
    fr: 'Email ou mot de passe incorrect.',
    ru: 'Неверный email или пароль.',
    tr: 'E-posta veya şifre yanlış.',
  },
  'auth/too-many-requests': {
    en: 'Too many attempts. Try later.',
    ar: 'محاولات كثيرة. انتظر قليلاً.',
    fr: 'Trop de tentatives.',
    ru: 'Слишком много попыток.',
    tr: 'Çok fazla deneme. Lütfen daha sonra tekrar deneyin.',
  },
  'auth/email-already-in-use': {
    en: 'Email already registered.',
    ar: 'البريد مسجّل مسبقاً.',
    fr: 'Email déjà utilisé.',
    ru: 'Email уже используется.',
    tr: 'Bu e-posta zaten kayıtlı.',
  },
  'auth/weak-password': {
    en: 'Min 6 characters.',
    ar: '٦ أحرف على الأقل.',
    fr: 'Min 6 caractères.',
    ru: 'Минимум 6 символов.',
    tr: 'En az 6 karakter.',
  },
  default: {
    en: 'Something went wrong.',
    ar: 'حدث خطأ. حاول مجدداً.',
    fr: 'Une erreur est survenue.',
    ru: 'Что-то пошло не так.',
    tr: 'Bir şeyler ters gitti.',
  },
};

const UI: Record<string, Record<Language, string>> = {
  login: {
    en: 'Login',
    ar: 'تسجيل الدخول',
    fr: 'Connexion',
    ru: 'Войти',
    tr: 'Giriş Yap',
  },
  register: {
    en: 'Register',
    ar: 'إنشاء حساب',
    fr: "S'inscrire",
    ru: 'Регистрация',
    tr: 'Kayıt Ol',
  },
  email: {
    en: 'Email',
    ar: 'البريد الإلكتروني',
    fr: 'Email',
    ru: 'Email',
    tr: 'E-posta',
  },
  password: {
    en: 'Password',
    ar: 'كلمة المرور',
    fr: 'Mot de passe',
    ru: 'Пароль',
    tr: 'Şifre',
  },
  google: {
    en: 'Continue with Google',
    ar: 'المتابعة مع جوجل',
    fr: 'Continuer avec Google',
    ru: 'Войти через Google',
    tr: 'Google ile devam et',
  },
  or: {
    en: 'OR',
    ar: 'أو',
    fr: 'OU',
    ru: 'ИЛИ',
    tr: 'VEYA',
  },
  fillFields: {
    en: 'Fill all fields.',
    ar: 'أكمل جميع الحقول.',
    fr: 'Remplissez tous les champs.',
    ru: 'Заполните все поля.',
    tr: 'Tüm alanları doldurun.',
  },
  minChars: {
    en: 'Min 6 characters.',
    ar: '٦ أحرف على الأقل.',
    fr: 'Min 6 caractères.',
    ru: 'Минимум 6 символов.',
    tr: 'En az 6 karakter.',
  },
  googleOnly: {
    en: 'This email is linked to Google Sign-In. Please use the "Continue with Google" button below.',
    ar: 'هذا البريد مرتبط بجوجل. الرجاء استخدام زر "المتابعة مع جوجل" أدناه.',
    fr: 'Cet email utilise Google. Veuillez utiliser le bouton Google.',
    ru: 'Этот email привязан к Google. Используйте кнопку Google.',
    tr: 'Bu e-posta Google ile bağlantılı. Lütfen Google düğmesini kullanın.',
  },
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleOnly, setIsGoogleOnly] = useState(false);

  const { language, setLanguage } = useAppStore();
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = (
    location.state as {
      from?: { pathname?: string; search?: string; hash?: string };
    } | null
  )?.from;

  const redirectAfterLogin = returnTo?.pathname
    ? `${returnTo.pathname}${returnTo.search || ''}${returnTo.hash || ''}`
    : '/';

  const lang = language as Language;
  const isRTL = lang === 'ar';

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
    { code: 'fr', label: 'FR' },
    { code: 'ru', label: 'RU' },
  ];

  const getError = (code: string) =>
    (ERRORS[code] || ERRORS.default)[lang] || ERRORS.default.en;

  const checkGoogleOnly = async (emailVal: string): Promise<boolean> => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, emailVal);

      if (methods.includes('google.com') && !methods.includes('password')) {
        setIsGoogleOnly(true);
        setError(UI.googleOnly[lang]);
        return true;
      }
    } catch {}

    return false;
  };

  const handleSubmit = async () => {
    setError('');
    setIsGoogleOnly(false);

    if (!email || !password) {
      setError(UI.fillFields[lang]);
      return;
    }

    if (password.length < 6) {
      setError(UI.minChars[lang]);
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        if (await checkGoogleOnly(email)) {
          setLoading(false);
          return;
        }

        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        if (await checkGoogleOnly(email)) {
          setLoading(false);
          return;
        }

        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate(redirectAfterLogin, { replace: true });
    } catch (e: any) {
      if (
        e.code === 'auth/invalid-credential' ||
        e.code === 'auth/wrong-password'
      ) {
        if (await checkGoogleOnly(email)) {
          setLoading(false);
          return;
        }
      }

      setError(getError(e.code));
    }

    setLoading(false);
  };

  const googleLogin = async () => {
    setError('');
    setIsGoogleOnly(false);
    setLoading(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate(redirectAfterLogin, { replace: true });
    } catch (e: any) {
      setError(getError(e.code));
    }

    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 15px',
    background: '#0b111d',
    border: '1px solid #263247',
    borderRadius: 10,
    color: '#fff',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontSize: 14,
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        minHeight: '100vh',
        background: '#050912',
        color: '#fff',
        fontFamily: 'inherit',
      }}
    >
      {/* الصورة العلوية */}
      <div
        style={{
          width: '100%',
          height: '31vh',
          minHeight: 190,
          maxHeight: 330,
          position: 'relative',
          overflow: 'hidden',
          backgroundImage:
            "linear-gradient(to bottom, rgba(3,8,17,0.05) 25%, rgba(3,8,17,0.35) 65%, #050912 100%), url('/shams-main-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '18px 20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 7,
              background: 'rgba(3,8,17,0.65)',
              padding: 5,
              borderRadius: 22,
              backdropFilter: 'blur(8px)',
            }}
          >
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                style={{
                  padding: '5px 9px',
                  borderRadius: 16,
                  border: 'none',
                  background:
                    lang === l.code ? '#f3bd28' : 'transparent',
                  color: lang === l.code ? '#050912' : '#d0d5df',
                  cursor: 'pointer',
                  fontSize: 11,
                  fontWeight: 800,
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div
            style={{
              color: '#f3bd28',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              fontWeight: 900,
              fontSize: 20,
              textShadow: '0 2px 12px rgba(0,0,0,.8)',
            }}
          >
            <Sun size={22} />
            SHAMS
          </div>
        </div>
      </div>

      {/* منطقة الدخول */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '0 18px 40px',
          marginTop: -28,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 430,
            background: 'rgba(11,17,29,0.97)',
            border: '1px solid #263247',
            borderRadius: 18,
            padding: '28px 22px 24px',
            boxShadow: '0 20px 60px rgba(0,0,0,.45)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 22 }}>
            <div
              style={{
                width: 58,
                height: 58,
                margin: '0 auto 10px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(243,189,40,.10)',
                border: '1px solid rgba(243,189,40,.35)',
                color: '#f3bd28',
              }}
            >
              <Sun size={30} />
            </div>

            <h1
              style={{
                color: '#f3bd28',
                fontSize: 25,
                fontWeight: 900,
                margin: 0,
                letterSpacing: 1,
              }}
            >
              {isRegister ? UI.register[lang] : UI.login[lang]}
            </h1>

            <p
              style={{
                color: '#788398',
                fontSize: 12,
                margin: '7px 0 0',
              }}
            >
              SHAMS • INTELLIGENT MEDIA
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              marginBottom: 20,
              background: '#070c15',
              borderRadius: 11,
              padding: 4,
              border: '1px solid #1d283a',
            }}
          >
            <button
              onClick={() => setIsRegister(false)}
              style={{
                flex: 1,
                padding: 11,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                background: !isRegister ? '#f3bd28' : 'transparent',
                color: !isRegister ? '#050912' : '#8792a5',
              }}
            >
              {UI.login[lang]}
            </button>

            <button
              onClick={() => setIsRegister(true)}
              style={{
                flex: 1,
                padding: 11,
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                background: isRegister ? '#f3bd28' : 'transparent',
                color: isRegister ? '#050912' : '#8792a5',
              }}
            >
              {UI.register[lang]}
            </button>
          </div>

          <input
            type="email"
            placeholder={UI.email[lang]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ ...inputStyle, marginBottom: 12 }}
          />

          <div style={{ position: 'relative', marginBottom: 15 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={UI.password[lang]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...inputStyle,
                paddingRight: isRTL ? 15 : 45,
                paddingLeft: isRTL ? 45 : 15,
              }}
            />

            <button
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                [isRTL ? 'left' : 'right']: 10,
                top: 10,
                width: 34,
                height: 34,
                background: 'transparent',
                border: 'none',
                color: '#7e899d',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p
              style={{
                color: '#ff6666',
                background: 'rgba(255,68,68,.08)',
                border: '1px solid rgba(255,68,68,.18)',
                borderRadius: 9,
                padding: 10,
                fontSize: 12,
                margin: '0 0 12px',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}

          {isGoogleOnly && !error && (
            <p
              style={{
                color: '#f3bd28',
                fontSize: 12,
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              {UI.googleOnly[lang]}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: 14,
              background: loading ? '#80651d' : '#f3bd28',
              border: 'none',
              borderRadius: 10,
              color: '#050912',
              fontWeight: 800,
              cursor: loading ? 'wait' : 'pointer',
              marginBottom: 15,
              fontSize: 14,
            }}
          >
            {loading
              ? '...'
              : isRegister
                ? UI.register[lang]
                : UI.login[lang]}
          </button>

          <div
            style={{
              textAlign: 'center',
              marginBottom: 15,
              color: '#4f5a6d',
              fontSize: 12,
            }}
          >
            — {UI.or[lang]} —
          </div>

          <button
            onClick={googleLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: 13,
              background: '#101827',
              border: '1px solid #2a3548',
              borderRadius: 10,
              color: '#fff',
              fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 9,
              fontSize: 13,
            }}
          >
            <span
              style={{
                color: '#f3bd28',
                fontWeight: 900,
                fontSize: 17,
              }}
            >
              G
            </span>
            {UI.google[lang]}
          </button>

          <p
            style={{
              textAlign: 'center',
              color: '#4f5a6d',
              fontSize: 10,
              margin: '18px 0 0',
            }}
          >
            © SHAMS • Intelligent Media Platform
          </p>
        </div>
      </div>
    </div>
  );
}
