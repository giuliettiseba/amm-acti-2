import {createContext, useContext} from 'react';
import type {OrderContextType} from '../types';

/**
 * Contexto de React para estado y acciones de pedido.
 *
 * Proporciona el valor del contexto de pedido a traves del arbol de componentes.
 * El tipo de valor del contexto esta definido por `OrderContextType`.
 *
 * @see OrderContextType
 */
export const OrderContext
    = createContext<OrderContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de pedido.
 *
 * Lanza un error si se usa fuera de un `OrderProvider`.
 *
 * @returns {OrderContextType} El valor actual del contexto de pedido.
 * @throws {Error} Si el hook se usa fuera de un `OrderProvider`.
 */
export function useOrder():OrderContextType {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error('useOrder debe usarse dentro de OrderProvider');
    return ctx;
}