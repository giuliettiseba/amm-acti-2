/**
 * Componente OrderProvider para gestionar el estado y las acciones del carrito de compras (carrito).
 *
 * Este proveedor maneja la adición, actualización y eliminación de elementos (tanto productos como libros) del carrito,
 * persiste el carrito en localStorage y expone todas las acciones y el estado relacionados con el carrito a través del contexto.
 * También activa notificaciones en los cambios del carrito.
 *
 * @module OrderProvider
 * @context OrderContext
 *
 * @example
 * <OrderProvider>
 *   <App />
 * </OrderProvider>
 */

import {type ReactNode, useEffect, useState} from "react";
import {useNotification} from "../context/NotificationContext.tsx";
import type {CarritoItem, Libro, ProductoCafe} from "../types";
import {OrderContext} from "../context/OrderContext.tsx";

/**
 * Clave utilizada para persistir el carrito en localStorage.
 * @constant {string}
 */
const STORAGE_KEY = 'carrito-pedidos';

/**
 * Proporciona el estado y las acciones del carrito a los componentes descendientes a través del contexto.
 */
const OrderProvider = ({children}: { children: ReactNode }) => {
    // Estado para los elementos del carrito.
    const [carrito, setCarrito] = useState<CarritoItem[]>([]);

    // Contexto de notificaciones para mostrar retroalimentación al usuario.
    const {addNotification} = useNotification();

    /**
     * Carga el carrito desde localStorage al montar el componente.
     */
    useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) setCarrito(JSON.parse(data));
    }, []);

    /**
     * Persiste el carrito en localStorage cada vez que cambia.
     */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    }, [carrito]);

    /**
     * Agrega un producto al carrito o actualiza su cantidad si ya existe.
     *
     * @param producto - El producto a agregar.
     * @param cantidad - Cantidad a agregar (por defecto: 1).
     * @returns Indica si el producto fue agregado o actualizado.
     */
    const agregarProducto = (producto: ProductoCafe, cantidad: number = 1): 'added' | 'updated' => {
        let result: 'added' | 'updated';
        setCarrito(prev => {
            const idx = prev.findIndex(
                item => item.tipo === 'producto' && item.producto.id === producto.id
            );
            let nuevo: CarritoItem[];
            if (idx !== -1) {
                nuevo = [...prev];
                nuevo[idx] = {...nuevo[idx], cantidad: nuevo[idx].cantidad + cantidad};
                result = 'updated';
            } else {
                nuevo = [...prev, {tipo: 'producto' as const, producto, cantidad}];
                result = 'added';
            }
            return nuevo;
        });
        addNotification({
            type: 'success',
            message: `Producto "${producto.name}" añadido al carrito`,
        });
        return result!;
    };

    /**
     * Agrega un libro al carrito o actualiza su cantidad si ya existe.
     *
     * @param libro - El libro a agregar.
     * @param cantidad - Cantidad a agregar (por defecto: 1).
     * @returns Indica si el libro fue agregado o actualizado.
     */
    const agregarLibro = (libro: Libro, cantidad: number = 1): 'added' | 'updated' => {
        let result: 'added' | 'updated';
        setCarrito(prev => {
            const idx = prev.findIndex(
                item => item.tipo === 'libro' && item.libro.id === libro.id
            );
            let nuevo: CarritoItem[];
            if (idx !== -1) {
                nuevo = [...prev];
                nuevo[idx] = {...nuevo[idx], cantidad: nuevo[idx].cantidad + cantidad};
                result = 'updated';
            } else {
                nuevo = [...prev, {tipo: 'libro' as const, libro, cantidad}];
                result = 'added';
            }
            return nuevo;
        });
        addNotification({
            type: 'success',
            message: `Libro "${libro.titulo}" añadido al carrito`,
        });
        return result!;
    };

    /**
     * Elimina un elemento (producto o libro) del carrito.
     *
     * @param {CarritoItem} item - El elemento a eliminar.
     */
    const quitarItem = (item: CarritoItem) => {
        setCarrito(prev => prev.filter(i => {
            if (item.tipo === 'producto' && i.tipo === 'producto') return i.producto.id !== item.producto.id;
            if (item.tipo === 'libro' && i.tipo === 'libro') return i.libro.id !== item.libro.id;
            return true;
        }));
        addNotification({
            type: 'success',
            message: `El item "${item.tipo === 'producto' ? item.producto.name : item.libro.titulo}" ha sido eliminado del carrito`,
        });
    };

    /**
     * Limpia todos los elementos del carrito.
     */
    const limpiarCarrito = () => setCarrito([]);

    /**
     * Actualiza la cantidad de un elemento específico en el carrito.
     *
     * @param {CarritoItem} item - El elemento a actualizar.
     * @param {number} cantidad - La nueva cantidad.
     */
    const actualizarCantidad = (item: CarritoItem, cantidad: number) => {
        setCarrito(prev => prev.map(i => {
            if (item.tipo === 'producto' && i.tipo === 'producto' && i.producto.id === item.producto.id) {
                return {...i, cantidad};
            }
            if (item.tipo === 'libro' && i.tipo === 'libro' && i.libro.id === item.libro.id) {
                return {...i, cantidad};
            }
            return i;
        }));
        addNotification({
            type: 'success',
            message: `La cantidad de ${item.tipo === 'producto' ? item.producto.name : item.libro.titulo} ha sido actualizada a ${cantidad}`,
        });
    };

    return (
        <OrderContext.Provider
            value={{carrito, agregarProducto, agregarLibro, quitarItem, limpiarCarrito, actualizarCantidad}}>
            {children}
        </OrderContext.Provider>
    );
};
export default OrderProvider
