import {createContext, useContext} from 'react';
import type {NotificationContextValue} from '../types';

/**
 * Contexto de React para estado y acciones de notificacion.
 *
 * Proporciona el valor del contexto de notificacion a traves del arbol de componentes.
 * El tipo de valor del contexto esta definido por `NotificationContextValue`.
 *
 * @see NotificationContextValue
 */
export const NotificationContext
    = createContext<NotificationContextValue | undefined>(undefined);

/**
 * Hook personalizado de React para acceder al contexto de notificacion.
 *
 * Proporciona acceso a acciones y estado relacionados con notificaciones desde el NotificationProvider.
 * Lanza un error si se usa fuera de un NotificationProvider.
 *
 * @returns {NotificationContextValue} El valor actual del contexto de notificacion.
 * @throws {Error} Si el hook se usa fuera de un NotificationProvider.
 */
export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotification debe usarse dentro de NotificationProvider');
    return ctx;
}