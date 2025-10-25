import {useContext} from 'react';
import {OrderContext} from '../context/OrderContext';

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder debe usarse dentro de OrderProvider');
  return ctx;
};

