import {useCallback, useEffect, useState} from 'react';
import {CafeteriaService} from '../services/cafeteria.service';
import {useNotification} from "../context/NotificationContext.tsx";
import type {UseCafeteriaState} from "../types/states/useCafeteriaState.ts";
import type {UseCafeteriaActions} from "../types/useCafeteriaActions.ts";

/**
 * Custom React hook to manage cafeteria state, including categories and products.
 *
 * Handles loading, error, and data states for both categories and products.
 * Provides actions to refetch categories, refetch products, load products by category, and clear products.
 * Notifies the user via the notification context on errors.
 *
 * @returns {UseCafeteriaState & UseCafeteriaActions} Combined state and actions for cafeteria management.
 *
 * @example
 * const {
 *   categorias,
 *   productos,
 *   loadingCategorias,
 *   loadingProductos,
 *   errorCategorias,
 *   errorProductos,
 *   refetchCategorias,
 *   refetchProductos,
 *   loadProductosByCategoria,
 *   clearProductos
 * } = useCafeteria();
 */
export function useCafeteria(): UseCafeteriaState & UseCafeteriaActions {
    /**
     * Adds a notification to the global notification context.
     * Used to display error messages to the user.
     */
    const {addNotification} = useNotification();

    /**
     * State object for cafeteria categories and products, including loading and error states.
     */
    const [state, setState] = useState<UseCafeteriaState>({
        categorias: null,
        productos: null,
        loadingCategorias: false,
        loadingProductos: false,
        errorCategorias: null,
        errorProductos: null,
    });

    /**
     * Loads the list of cafeteria categories from the CafeteriaService.
     * Updates loading and error state accordingly.
     * Notifies the user if an error occurs.
     */
    const loadCategorias = useCallback(async () => {
        setState(prev => ({...prev, loadingCategorias: true, errorCategorias: null}));
        try {
            const categorias = await CafeteriaService.getCategorias();
            setState(prev => ({...prev, categorias, loadingCategorias: false}));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al cargar categorías';
            setState(prev => ({...prev, errorCategorias: errorMessage, loadingCategorias: false}));
            addNotification({
                type: 'error',
                message: 'Error al cargar las categorías de la cafetería'
            });
        }
    }, [addNotification]);

    /**
     * Loads the list of products for a given category from the CafeteriaService.
     * Updates loading and error state accordingly.
     * Notifies the user if an error occurs.
     *
     * @param {string} categoria - The category to load products for.
     */
    const loadProductosByCategoria = useCallback(async (categoria: string) => {
        setState(prev => ({...prev, loadingProductos: true, errorProductos: null}));
        try {
            const productos = await CafeteriaService.getProductosByCategoria(categoria);
            setState(prev => ({...prev, productos, loadingProductos: false}));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al cargar productos';
            setState(prev => ({...prev, errorProductos: errorMessage, loadingProductos: false}));
            addNotification({
                type: 'error',
                message: `Error al cargar productos de la categoría "${categoria}"`
            });
        }
    }, [addNotification]);

    /**
     * Refetches the list of categories by calling loadCategorias.
     * Can be used to manually refresh categories from a component.
     */
    const refetchCategorias = useCallback(async () => {
        await loadCategorias();
    }, [loadCategorias]);

    /**
     * Refetches the list of products for the currently selected category.
     * This function only sets the loading state; the actual fetch should be handled by the component.
     */
    const refetchProductos = useCallback(async () => {
        // Esta función será llamada desde el componente que sabe qué categoría recargar
        // Por ahora solo actualiza el estado de loading
        setState(prev => ({...prev, loadingProductos: true, errorProductos: null}));
    }, []);

    /**
     * Clears the products and any associated error from the state.
     * Useful when changing categories or resetting the product list.
     */
    const clearProductos = useCallback(() => {
        setState(prev => ({...prev, productos: null, errorProductos: null}));
    }, []);

    /**
     * Loads categories when the hook is first mounted.
     */
    useEffect(() => {
        loadCategorias().then(r => console.debug('Categorías cargadas' + r));
    }, [loadCategorias]);

    return {
        ...state,
        refetchCategorias,
        refetchProductos,
        loadProductosByCategoria,
        clearProductos,
    };
}
