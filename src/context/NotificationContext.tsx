import {createContext, useContext} from 'react';
import type {NotificationContextValue} from '../types';

export const NotificationContext
    = createContext<NotificationContextValue | undefined>(undefined);


export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotification debe usarse dentro de NotificationProvider');
    return ctx;
}
