import {createContext, useContext} from 'react';
    import type {NotificationContextValue} from '../types';

    /**
     * React Context for notification state and actions.
     *
     * Provides the notification context value throughout the component tree.
     * The context value type is defined by `NotificationContextValue`.
     *
     * @see NotificationContextValue
     */
    export const NotificationContext
        = createContext<NotificationContextValue | undefined>(undefined);

    /**
     * Custom React hook to access the notification context.
     *
     * Provides access to notification-related actions and state from the NotificationProvider.
     * Throws an error if used outside of a NotificationProvider.
     *
     * @returns {NotificationContextValue} The current notification context value.
     * @throws {Error} If the hook is used outside of a NotificationProvider.
     */
    export function useNotification() {
        const ctx = useContext(NotificationContext);
        if (!ctx) throw new Error('useNotification debe usarse dentro de NotificationProvider');
        return ctx;
    }