import type { NotificationItem } from './NotificationItem';

export interface NotificationContextValue {
  notifications: NotificationItem[];
  addNotification: (n: Omit<NotificationItem, 'id' | 'createdAt'> & { id?: string }) => string;
  removeNotification: (id: string) => void;
  clear: () => void;
}


