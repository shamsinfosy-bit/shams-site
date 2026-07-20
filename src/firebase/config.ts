import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBdRwN9oGKZB4ztXmtZEF-0hNt-b6xCqAw",
  authDomain: "shams-1db5a.firebaseapp.com",
  projectId: "shams-1db5a",
  storageBucket: "shams-1db5a.firebasestorage.app",
  messagingSenderId: "320020297575",
  appId: "1:320020297575:web:25983830e71ee5b11761c2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export const firebaseAuth = {
  signInWithGoogle: () => signInWithPopup(auth, googleProvider),
  signInWithFacebook: () => signInWithPopup(auth, facebookProvider),
  signInWithTwitter: () => signInWithPopup(auth, twitterProvider),
  signInWithEmail: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
  registerWithEmail: (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
};

export default app;
