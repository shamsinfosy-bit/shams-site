import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserLocalPersistence, setPersistence, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyBdRwN9oGKZB4ztXmtZEF-0hNt-b6xCqAw",
  authDomain: "shams-1db5a.firebaseapp.com",
  projectId: "shams-1db5a",
  storageBucket: "shams-1db5a.firebasestorage.app",
  messagingSenderId: "320020297575",
  appId: "1:320020297575:web:25983830e71ee5b11761c2",
};

const app = initializeApp(firebaseConfig);

// تفعيل App Check مع reCAPTCHA
try {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6Ldf4DktAAAAAMMJUhlFjxMaFNGYExVktK5dIVUh'),
    isTokenAutoRefreshEnabled: true,
  });
} catch (e) {
  console.warn('App Check initialization skipped');
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
