import {createContext} from 'react';

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

export type { NotificationContextValue };
export default NotificationContext;
