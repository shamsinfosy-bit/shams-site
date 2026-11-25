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
// ========== موافقات المحتوى ==========

export const approveContent = async (id: string) => {
  return updateDoc(doc(db, 'content', id), {
    status: 'approved',
    approved: true,
    updatedAt: serverTimestamp()
  });
};

export const rejectContent = async (id: string) => {
  return updateDoc(doc(db, 'content', id), {
    status: 'rejected',
    approved: false,
    updatedAt: serverTimestamp()
  });
};

export const publishContent = async (id: string) => {
  return updateDoc(doc(db, 'content', id), {
    status: 'published',
    updatedAt: serverTimestamp()
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

export const saveComment = async (id: string, data: any) => {
  return setDoc(doc(db, 'comments', id), { ...data, updatedAt: serverTimestamp() }, { merge: true });
};

export const deleteComment = async (id: string) => {
  return deleteDoc(doc(db, 'comments', id));
};

export const subscribeComments = (callback: (comments: any[]) => void) => {
  return onSnapshot(collection(db, 'comments'), (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const updateCommentStatus = async (id: string, status: string) => {
  return updateDoc(doc(db, 'comments', id), {
    status,
    updatedAt: serverTimestamp()
  });
};

export const subscribeNotifications = (userId: string, callback: (notifs: any[]) => void) => {
  const q = query(collection(db, 'notifications'), where('userId', '==', userId));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const markNotificationRead = async (id: string) => {
  return updateDoc(doc(db, 'notifications', id), {
    read: true,
    updatedAt: serverTimestamp()
  });
};

export const deleteNotification = async (id: string) => {
  return deleteDoc(doc(db, 'notifications', id));
};
