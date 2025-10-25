/**
 * NotificationProvider component for managing global notification state and actions.
 *
 * Provides a context for adding, removing, and clearing notifications, as well as automatically
 * removing notifications after a timeout. Notifications are stored in local state and exposed
 * to descendant components via the NotificationContext.
 *
 * @module NotificationProvider
 * @context NotificationContext
 *
 * @param {NotificationProviderProps} props - The provider props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @param {number} [props.defaultTimeout=4500] - Default timeout in milliseconds for auto-removal of notifications.
 *
 * @returns {JSX.Element} The provider component wrapping its children.
 *
 * @example
 * <NotificationProvider>
 *   <App />
 * </NotificationProvider>
 */
import {useCallback, useState} from 'react';
import {NotificationContext} from '../context/NotificationContext';
import type {NotificationContextValue, NotificationItem} from "../types";
import type {NotificationProviderProps} from "../types/props/NotificationProviderProps.tsx";

export function NotificationProvider({children, defaultTimeout = 4500}: NotificationProviderProps) {
    /**
     * State for the list of notifications.
     */
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    /**
     * Removes a notification by its id.
     * @param id - The id of the notification to remove.
     */
    const removeNotification = useCallback((id: string) => {
        setNotifications(curr => curr.filter(n => n.id !== id));
    }, []);

    /**
     * Adds a notification to the list and schedules its removal after a timeout.
     *
     * @param n - Notification data.
     * @returns The id of the added notification.
     */
    const addNotification: NotificationContextValue['addNotification'] = (n) => {
        const id = n.id || crypto.randomUUID();
        const timeout = n.timeout ?? defaultTimeout;
        const item: NotificationItem = {id, type: n.type, message: n.message, createdAt: Date.now(), timeout};
        setNotifications(curr => [...curr, item]);
        if (timeout && timeout > 0) {
            setTimeout(() => removeNotification(id), timeout);
        }
        return id;
    };

    /**
     * Clears all notifications from the list.
     */
    const clear = useCallback(() => setNotifications([]), []);

    return (
        <NotificationContext.Provider value={{notifications, addNotification, removeNotification, clear}}>
            {children}
        </NotificationContext.Provider>
    );
}
