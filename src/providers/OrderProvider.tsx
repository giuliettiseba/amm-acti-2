/**
 * OrderProvider component for managing the shopping cart (carrito) state and actions.
 *
 * This provider handles adding, updating, and removing items (both products and books) from the cart,
 * persists the cart to localStorage, and exposes all cart-related actions and state via context.
 * It also triggers notifications on cart changes.
 *
 * @module OrderProvider
 * @context OrderContext
 *
 * @example
 * <OrderProvider>
 *   <App />
 * </OrderProvider>
 */
import {type ReactNode, useEffect, useState} from 'react';
import {OrderContext} from '../context/OrderContext';
import type {CarritoItem, Libro, ProductoCafe} from '../types';
import {useNotification} from '../context/NotificationContext';

/**
 * Key used for persisting the cart in localStorage.
 * @constant {string}
 */
const STORAGE_KEY = 'carrito-pedidos';

/**
 * Provides cart state and actions to descendant components via context.
 *
 * @param {object} props
 * @param {ReactNode} props.children - Child components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component wrapping its children.
 */
export const OrderProvider = ({children}: { children: ReactNode }) => {
    /**
     * State for the cart items.
     * @type {[CarritoItem[], Function]}
     */
    const [carrito, setCarrito] = useState<CarritoItem[]>([]);

    /**
     * Notification context for showing user feedback.
     */
    const {addNotification} = useNotification();

    /**
     * Loads cart from localStorage on mount.
     */
    useEffect(() => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) setCarrito(JSON.parse(data));
    }, []);

    /**
     * Persists cart to localStorage whenever it changes.
     */
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    }, [carrito]);

    /**
     * Adds a product to the cart or updates its quantity if it already exists.
     *
     * @param {ProductoCafe} producto - The product to add.
     * @param {number} [cantidad=1] - Quantity to add.
     * @returns {'added' | 'updated'} Whether the product was added or updated.
     */
    const agregarProducto = (producto: ProductoCafe, cantidad = 1): 'added' | 'updated' => {
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
     * Adds a book to the cart or updates its quantity if it already exists.
     *
     * @param {Libro} libro - The book to add.
     * @param {number} [cantidad=1] - Quantity to add.
     * @returns {'added' | 'updated'} Whether the book was added or updated.
     */
    const agregarLibro = (libro: Libro, cantidad = 1): 'added' | 'updated' => {
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
     * Removes an item (product or book) from the cart.
     *
     * @param {CarritoItem} item - The item to remove.
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
     * Clears all items from the cart.
     */
    const limpiarCarrito = () => setCarrito([]);

    /**
     * Updates the quantity of a specific item in the cart.
     *
     * @param {CarritoItem} item - The item to update.
     * @param {number} cantidad - The new quantity.
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
