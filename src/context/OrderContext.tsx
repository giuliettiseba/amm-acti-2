import {createContext, useContext} from 'react';
import type {OrderContextType} from '../types';

export const OrderContext
    = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error('useOrder debe usarse dentro de OrderProvider');
    return ctx;
};

