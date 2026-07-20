import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store';
import { Language } from '../../../i18n/translations';
import { auth } from '../../../services/firebase';
import {
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';

const ADMIN_EMAILS = ['director@shams.com', 'shamsinfosy@gmail.com', 'deputy@shams.com', 'admin@shams.com'];
const isAdminEmail = (e: string) => ADMIN_EMAILS.includes(e);

const ERRORS: Record<string, Record<string, string>> = {
  'auth/user-not-found':       { en: 'No account found. Please register.', ar: 'الحساب غير موجود. سجّل أولاً.', fr: 'Compte introuvable.', ru: 'Аккаунт не найден.' },
  'auth/wrong-password':       { en: 'Wrong password.', ar: 'كلمة المرور خاطئة.', fr: 'Mot de passe incorrect.', ru: 'Неверный пароль.' },
  'auth/invalid-credential':   { en: 'Wrong email or password.', ar: 'البريد أو كلمة المرور خاطئة.', fr: 'Email ou mot de passe incorrect.', ru: 'Неверный email или пароль.' },
  'auth/too-many-requests':    { en: 'Too many attempts. Try later.', ar: 'محاولات كثيرة. انتظر قليلاً.', fr: 'Trop de tentatives.', ru: 'Слишком много попыток.' },
  'auth/email-already-in-use': { en: 'Email already registered.', ar: 'البريد مسجّل مسبقاً.', fr: 'Email déjà utilisé.', ru: 'Email уже используется.' },
  'auth/weak-password':        { en: 'Min 6 characters.', ar: '٦ أحرف على الأقل.', fr: 'Min 6 caractères.', ru: 'Минимум 6 символов.' },
  'default':                   { en: 'Something went wrong.', ar: 'حدث خطأ. حاول مجدداً.', fr: 'Une erreur est survenue.', ru: 'Что-то пошло не так.' },
};

const UI: Record<string, Record<Language, string>> = {
  login:      { en: 'Login',                ar: 'تسجيل الدخول',      fr: 'Connexion',             ru: 'Войти'              },
  register:   { en: 'Register',             ar: 'إنشاء حساب',        fr: "S'inscrire",            ru: 'Регистрация'        },
  email:      { en: 'Email',                ar: 'البريد الإلكتروني', fr: 'Email',                 ru: 'Email'              },
  password:   { en: 'Password',             ar: 'كلمة المرور',       fr: 'Mot de passe',          ru: 'Пароль'             },
  google:     { en: 'Continue with Google', ar: 'المتابعة مع جوجل',  fr: 'Continuer avec Google', ru: 'Войти через Google' },
  or:         { en: 'OR',                   ar: 'أو',                fr: 'OU',                    ru: 'ИЛИ'               },
  fillFields: { en: 'Fill all fields.',     ar: 'أكمل جميع الحقول.', fr: 'Remplissez tous les champs.', ru: 'Заполните все поля.' },
  minChars:   { en: 'Min 6 characters.',    ar: '٦ أحرف على الأقل.', fr: 'Min 6 caractères.',     ru: 'Минимум 6 символов.' },
  googleOnly: { en: 'This email is linked to Google Sign-In. Please use the "Continue with Google" button below.', ar: 'هذا البريد مرتبط بجوجل. الرجاء استخدام زر "المتابعة مع جوجل" أدناه.', fr: 'Cet email utilise Google. Veuillez utiliser le bouton Google.', ru: 'Этот email привязан к Google. Используйте кнопку Google.' },
};

export default function Login() {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [isRegister, setIsRegister]     = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleOnly, setIsGoogleOnly] = useState(false);

  const { language, setLanguage } = useAppStore();
  const navigate = useNavigate();
  const lang = language as Language;
  const isRTL = lang === 'ar';

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' }, { code: 'ar', label: 'AR' },
    { code: 'fr', label: 'FR' }, { code: 'ru', label: 'RU' },
  ];

  const getError = (code: string) =>
    (ERRORS[code] || ERRORS['default'])[lang] || ERRORS['default']['en'];

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
    setError(''); setIsGoogleOnly(false);
    if (!email || !password) { setError(UI.fillFields[lang]); return; }
    if (password.length < 6) { setError(UI.minChars[lang]); return; }
    setLoading(true);
    try {
      if (isRegister) {
        if (await checkGoogleOnly(email)) { setLoading(false); return; }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        if (await checkGoogleOnly(email)) { setLoading(false); return; }
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/', { replace: true });
    } catch (e: any) {
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password') {
        if (await checkGoogleOnly(email)) { setLoading(false); return; }
      }
      setError(getError(e.code));
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    setError(''); setIsGoogleOnly(false); setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/', { replace: true });
    } catch (e: any) { setError(getError(e.code)); }
    setLoading(false);
  };

  const inp = {
    width: '100%', padding: 12, background: '#111',
    border: '1px solid #333', borderRadius: 8,
    color: '#fff', outline: 'none', boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#1a1a1a', borderRadius: 16, padding: 40, border: '1px solid #333' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {langs.map(l => (
            <button key={l.code} onClick={() => setLanguage(l.code)} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #444', background: 'transparent', color: lang === l.code ? '#c9a050' : '#888', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>{l.label}</button>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>☀️</div>
          <h1 style={{ color: '#c9a050', fontSize: 28, fontWeight: 900, margin: 0 }}>SHAMS</h1>
          <p style={{ color: '#555', fontSize: 12, marginTop: 4 }}>INTELLIGENT MEDIA</p>
        </div>

        <div style={{ display: 'flex', marginBottom: 20, background: '#222', borderRadius: 10, padding: 4 }}>
          <button onClick={() => setIsRegister(false)} style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, background: !isRegister ? '#c9a050' : 'transparent', color: !isRegister ? '#000' : '#888' }}>{UI.login[lang]}</button>
          <button onClick={() => setIsRegister(true)} style={{ flex: 1, padding: 10, borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, background: isRegister ? '#c9a050' : 'transparent', color: isRegister ? '#000' : '#888' }}>{UI.register[lang]}</button>
        </div>

        <input type="email" placeholder={UI.email[lang]} value={email} onChange={e => setEmail(e.target.value)} style={{ ...inp, marginBottom: 12 }} />
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input type={showPassword ? 'text' : 'password'} placeholder={UI.password[lang]} value={password} onChange={e => setPassword(e.target.value)} style={{ ...inp, paddingRight: 40, marginBottom: 0 }} />
          <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>

        {error && <p style={{ color: '#ff4444', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{error}</p>}
        {isGoogleOnly && !error && <p style={{ color: '#c9a050', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{UI.googleOnly[lang]}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: 14, background: loading ? '#886600' : '#c9a050', border: 'none', borderRadius: 10, color: '#000', fontWeight: 700, cursor: 'pointer', marginBottom: 16 }}>{loading ? '...' : isRegister ? UI.register[lang] : UI.login[lang]}</button>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ color: '#555' }}>— {UI.or[lang]} —</span>
        </div>

        <button onClick={googleLogin} disabled={loading} style={{ width: '100%', padding: 13, background: '#222', border: '1px solid #333', borderRadius: 10, color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}><span style={{ color: '#c9a050', fontWeight: 700 }}>G</span> {UI.google[lang]}</button>
      </div>
    </div>
  );
}
