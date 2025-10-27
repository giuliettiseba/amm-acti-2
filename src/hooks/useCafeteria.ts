import {useCallback, useEffect, useState} from 'react';
import {CafeteriaService} from '../services/cafeteria.service';
import {useNotification} from "../context/NotificationContext.tsx";
import type {UseCafeteriaState} from "../types/states/useCafeteriaState.ts";
import type {UseCafeteriaActions} from "../types/useCafeteriaActions.ts";

/**
 * Hook personalizado de React para gestionar estado de cafeteria, incluyendo categorias y productos.
 *
 * Maneja estados de carga, error y datos para categorias y productos.
 * Proporciona acciones para refetch de categorias, refetch de productos, cargar productos por categoria y limpiar productos.
 * Notifica al usuario via contexto de notificaciones en caso de errores.
 *
 * @returns {UseCafeteriaState & UseCafeteriaActions} Estado y acciones combinados para gestion de cafeteria.
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
     * Anade una notificacion al contexto global de notificaciones.
     * Se usa para mostrar mensajes de error al usuario.
     */
    const {addNotification} = useNotification();

    /**
     * Objeto de estado para categorias y productos de cafeteria, incluyendo estados de carga y error.
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
     * Carga la lista de categorias de cafeteria desde CafeteriaService.
     * Actualiza el estado de carga y error en consecuencia.
     * Notifica al usuario si ocurre un error.
     *
     * @param {boolean} force - Si es true, evita cache y fuerza una recarga fresca
     */
    const loadCategorias = useCallback(async (force = false) => {
        setState(prev => ({...prev, loadingCategorias: true, errorCategorias: null}));
        try {
            const categorias = await CafeteriaService.getCategorias(force);
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
     * Carga la lista de productos para una categoria dada desde CafeteriaService.
     * Actualiza el estado de carga y error en consecuencia.
     * Notifica al usuario si ocurre un error.
     *
     * @param {string} categoria - La categoria para la cual cargar productos.
     * @param {boolean} force - Si es true, evita cache y fuerza una recarga fresca
     */
    const loadProductosByCategoria = useCallback(async (categoria: string, force = false) => {
        setState(prev => ({...prev, loadingProductos: true, errorProductos: null}));
        try {
            const productos = await CafeteriaService.getProductosByCategoria(categoria, force);
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
     * Vuelve a obtener la lista de categorias llamando a loadCategorias con force=true.
     * Puede usarse para refrescar manualmente categorias desde un componente, evitando cache.
     */
    const refetchCategorias = useCallback(async () => {
        await loadCategorias(true); // Force cache bypass
    }, [loadCategorias]);

    /**
     * Vuelve a obtener la lista de productos para la categoria actualmente seleccionada.
     * Esta funcion solo establece el estado de carga; el fetch real debe ser manejado por el componente.
     */
    const refetchProductos = useCallback(async () => {
        // Esta funcion sera llamada desde el componente que sabe que categoria recargar
        // Por ahora solo actualiza el estado de loading
        setState(prev => ({...prev, loadingProductos: true, errorProductos: null}));
    }, []);

    /**
     * Limpia los productos y cualquier error asociado del estado.
     * Util al cambiar categorias o reiniciar la lista de productos.
     */
    const clearProductos = useCallback(() => {
        setState(prev => ({...prev, productos: null, errorProductos: null}));
    }, []);

    /**
     * Carga categorias cuando el hook se monta por primera vez.
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
