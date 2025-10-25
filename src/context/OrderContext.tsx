import {createContext, useContext} from 'react';
import type {OrderContextType} from '../types';

/**
 * React Context for order state and actions.
 *
 * Provides the order context value throughout the component tree.
 * The context value type is defined by `OrderContextType`.
 *
 * @see OrderContextType
 */
export const OrderContext
    = createContext<OrderContextType | undefined>(undefined);

/**
 * Custom hook to access the order context.
 *
 * Throws an error if used outside of an `OrderProvider`.
 *
 * @returns {OrderContextType} The current order context value.
 * @throws {Error} If the hook is used outside of an `OrderProvider`.
 */
export function useOrder():OrderContextType {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error('useOrder debe usarse dentro de OrderProvider');
    return ctx;
};
