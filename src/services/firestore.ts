import { db } from './firebase';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';

// ========== المستخدمين ==========
export const getUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveUser = async (uid: string, data: any) => {
  return setDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

export const deleteUser = async (uid: string) => {
  return deleteDoc(doc(db, 'users', uid));
};

export const subscribeUsers = (callback: (users: any[]) => void) => {
  return onSnapshot(collection(db, 'users'), (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

// ========== المحتوى ==========
export const getContent = async () => {
  const snapshot = await getDocs(collection(db, 'content'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const saveContent = async (id: string, data: any) => {
  return setDoc(doc(db, 'content', id), { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

export const deleteContent = async (id: string) => {
  return deleteDoc(doc(db, 'content', id));
};

export const subscribeContent = (callback: (content: any[]) => void) => {
  return onSnapshot(collection(db, 'content'), (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

// ========== الإيرادات ==========
export const getRevenue = async () => {
  const snapshot = await getDocs(collection(db, 'revenue'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ========== التعليقات ==========
export const getComments = async () => {
  const snapshot = await getDocs(collection(db, 'comments'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ========== الإشعارات ==========
export const getNotifications = async (userId: string) => {
  const q = query(collection(db, 'notifications'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
