import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserLocalPersistence, setPersistence, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// App Check مفعّل على الإنتاج فقط — بيئة staging لا تحتاج هذي الحماية
// (مفتاح reCAPTCHA مسجّل خصيصاً لنطاق الإنتاج، وتفعيله على نطاق آخر يفشل بصمت)
// التحميل كسول (dynamic import) عشان زوار staging ما يحمّلون كود App Check إطلاقاً
const isProduction = firebaseConfig.projectId === 'shams-1db5a';

if (isProduction) {
  import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
    try {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6Ldf4DktAAAAAMMJUhlFjxMaFNGYExVktK5dIVUh'),
        isTokenAutoRefreshEnabled: true,
      });
    } catch (e) {
      console.warn('App Check initialization skipped');
    }
  });
}

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const resetPassword = (email: string) =>
  sendPasswordResetEmail(auth, email);

export const logout = () => signOut(auth);

export default app;

import { getFunctions, httpsCallable } from 'firebase/functions';

export const functions = getFunctions(app);

export const checkLoginRateLimit = (email: string) =>
  httpsCallable(functions, 'checkRateLimit')({ email });

export const logLoginAttempt = (email: string, success: boolean) =>
  httpsCallable(functions, 'logLoginAttempt')({ email, success });
