import { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type: Notification['type']) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('shams_notifications');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Welcome to SHAMS!', message: 'Your account has been created successfully.', type: 'success', read: false, createdAt: new Date() },
      { id: '2', title: 'Security Alert', message: 'New login detected from a new device.', type: 'warning', read: false, createdAt: new Date() },
    ];
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const saveNots = (nots: Notification[]) => {
    setNotifications(nots);
    localStorage.setItem('shams_notifications', JSON.stringify(nots));
  };

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNot: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date(),
    };
    saveNots([newNot, ...notifications]);
  };

  const markAsRead = (id: string) => {
    saveNots(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    saveNots(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    saveNots(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    saveNots([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, deleteNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
