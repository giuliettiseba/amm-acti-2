export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  createdAt: number;
  timeout?: number; // ms
}
