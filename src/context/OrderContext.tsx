import {createContext} from 'react';
import type {ProductoCafe, Libro} from '../types';

export type CarritoItem =
  | ({ tipo: 'producto'; producto: ProductoCafe } & { cantidad: number })
  | ({ tipo: 'libro'; libro: Libro } & { cantidad: number });

interface OrderContextType {
  carrito: CarritoItem[];
  agregarProducto: (producto: ProductoCafe, cantidad?: number) => void;
  agregarLibro: (libro: Libro, cantidad?: number) => void;
  quitarItem: (item: CarritoItem) => void;
  limpiarCarrito: () => void;
  actualizarCantidad: (item: CarritoItem, cantidad: number) => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

