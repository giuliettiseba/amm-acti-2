import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: number;
  timeout?: number; // ms
}

interface NotificationContextValue {
  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, 'id' | 'createdAt'> & { id?: string }) => string;
  removeNotification: (id: string) => void;
  clear: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

interface Props { children: ReactNode; defaultTimeout?: number }

export function NotificationProvider({ children, defaultTimeout = 4500 }: Props) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(curr => curr.filter(n => n.id !== id));
  }, []);

  const addNotification = useCallback<NotificationContextValue['addNotification']>((n) => {
    const id = n.id || crypto.randomUUID();
    const timeout = n.timeout ?? defaultTimeout;
    const item: NotificationItem = { id, type: n.type, message: n.message, createdAt: Date.now(), timeout };
    setNotifications(curr => [...curr, item]);
    if (timeout && timeout > 0) {
      setTimeout(() => removeNotification(id), timeout);
    }
    return id;
  }, [defaultTimeout, removeNotification]);

  const clear = useCallback(() => setNotifications([]), []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification debe usarse dentro de NotificationProvider');
  return ctx;
}

