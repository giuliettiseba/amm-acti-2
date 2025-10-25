import {type ReactNode, useCallback, useState} from 'react';
import {NotificationContext,} from '../context/NotificationContext';
import type {NotificationContextValue, NotificationItem} from "../types";


interface Props { children: ReactNode; defaultTimeout?: number }

export function NotificationProvider({ children, defaultTimeout = 4500 }: Props) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(curr => curr.filter(n => n.id !== id));
  }, []);

  const addNotification: NotificationContextValue['addNotification'] = (n) => {
    const id = n.id || crypto.randomUUID();
    const timeout = n.timeout ?? defaultTimeout;
    const item: NotificationItem = { id, type: n.type, message: n.message, createdAt: Date.now(), timeout };
    setNotifications(curr => [...curr, item]);
    if (timeout && timeout > 0) {
      setTimeout(() => removeNotification(id), timeout);
    }
    return id;
  };

  const clear = useCallback(() => setNotifications([]), []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}
