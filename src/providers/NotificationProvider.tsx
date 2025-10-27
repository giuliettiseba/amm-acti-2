/**
 * Componente NotificationProvider para gestionar el estado global de notificaciones y sus acciones.
 *
 * Proporciona un contexto para agregar, eliminar y limpiar notificaciones, así como para eliminarlas
 * automáticamente después de un tiempo de espera. Las notificaciones se almacenan en el estado local
 * y se exponen a los componentes descendientes a través del NotificationContext.
 *
 * @module NotificationProvider
 * @context NotificationContext
 *
 * @param {NotificationProviderProps} props - Las propiedades del proveedor.
 * @param {React.ReactNode} props.children - Componentes hijos envueltos por el proveedor.
 * @param {number} [props.defaultTimeout=4500] - Tiempo de espera predeterminado en milisegundos para la eliminación automática de notificaciones.
 *
 * @returns {JSX.Element} El componente proveedor que envuelve a sus hijos.
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
     * Estado para la lista de notificaciones.
     */
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    /**
     * Elimina una notificación por su id.
     * @param id - El id de la notificación a eliminar.
     */
    const removeNotification = useCallback((id: string) => {
        setNotifications(curr => curr.filter(n => n.id !== id));
    }, []);

    /**
     * Agrega una notificación a la lista y programa su eliminación después de un tiempo de espera.
     *
     * @param n - Datos de la notificación.
     * @returns El id de la notificación agregada.
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
     * Limpia todas las notificaciones de la lista.
     */
    const clear = useCallback(() => setNotifications([]), []);

    return (
        <NotificationContext.Provider value={{notifications, addNotification, removeNotification, clear}}>
            {children}
        </NotificationContext.Provider>
    );
}
