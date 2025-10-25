import {type ReactNode, useEffect, useState} from 'react';
import { OrderContext} from '../context/OrderContext';
import type {CarritoItem, Libro, ProductoCafe} from '../types';

const STORAGE_KEY = 'carrito-pedidos';

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setCarrito(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto: ProductoCafe, cantidad = 1): 'added' | 'updated' => {
    let result: 'added' | 'updated';
    setCarrito(prev => {
      const idx = prev.findIndex(
        item => item.tipo === 'producto' && item.producto.id === producto.id
      );
      let nuevo: CarritoItem[];
      if (idx !== -1) {
        nuevo = [...prev];
        nuevo[idx] = { ...nuevo[idx], cantidad: nuevo[idx].cantidad + cantidad };
        result = 'updated';
      } else {
        nuevo = [...prev, { tipo: 'producto' as const, producto, cantidad }];
        result = 'added';
      }
      return nuevo;
    });
    return result!;
  };

  const agregarLibro = (libro: Libro, cantidad = 1): 'added' | 'updated' => {
    let result: 'added' | 'updated';
    setCarrito(prev => {
      const idx = prev.findIndex(
        item => item.tipo === 'libro' && item.libro.id === libro.id
      );
      let nuevo: CarritoItem[];
      if (idx !== -1) {
        nuevo = [...prev];
        nuevo[idx] = { ...nuevo[idx], cantidad: nuevo[idx].cantidad + cantidad };
        result = 'updated';
      } else {
        nuevo = [...prev, { tipo: 'libro' as const, libro, cantidad }];
        result = 'added';
      }
      return nuevo;
    });
    return result!;
  };

  const quitarItem = (item: CarritoItem) => {
    setCarrito(prev => prev.filter(i => {
      if (item.tipo === 'producto' && i.tipo === 'producto') return i.producto.id !== item.producto.id;
      if (item.tipo === 'libro' && i.tipo === 'libro') return i.libro.id !== item.libro.id;
      return true;
    }));
  };

  const limpiarCarrito = () => setCarrito([]);

  const actualizarCantidad = (item: CarritoItem, cantidad: number) => {
    setCarrito(prev => prev.map(i => {
      if (item.tipo === 'producto' && i.tipo === 'producto' && i.producto.id === item.producto.id) {
        return { ...i, cantidad };
      }
      if (item.tipo === 'libro' && i.tipo === 'libro' && i.libro.id === item.libro.id) {
        return { ...i, cantidad };
      }
      return i;
    }));
  };

  return (
    <OrderContext.Provider value={{ carrito, agregarProducto, agregarLibro, quitarItem, limpiarCarrito, actualizarCantidad }}>
      {children}
    </OrderContext.Provider>
  );
};
