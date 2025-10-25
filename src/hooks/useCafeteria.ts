import {useCallback, useEffect, useState} from 'react';
import {CafeteriaService} from '../services/cafeteria.service';

import type {CategoriaProducto, ProductoCafe} from '../types';
import {useNotification} from "./useNotification.ts";

interface UseCafeteriaState {
  categorias: CategoriaProducto[] | null;
  productos: ProductoCafe[] | null;
  loadingCategorias: boolean;
  loadingProductos: boolean;
  errorCategorias: string | null;
  errorProductos: string | null;
}

interface UseCafeteriaActions {
  refetchCategorias: () => Promise<void>;
  refetchProductos: () => Promise<void>;
  loadProductosByCategoria: (categoria: string) => Promise<void>;
  clearProductos: () => void;
}

/**
 * Hook personalizado para gestionar el estado de la cafetería
 * Maneja categorías y productos con sus respectivos estados de carga y errores
 */
export function useCafeteria(): UseCafeteriaState & UseCafeteriaActions {
  const { addNotification } = useNotification();

  const [state, setState] = useState<UseCafeteriaState>({
    categorias: null,
    productos: null,
    loadingCategorias: false,
    loadingProductos: false,
    errorCategorias: null,
    errorProductos: null,
  });

  // Cargar categorías
  const loadCategorias = useCallback(async () => {
    setState(prev => ({ ...prev, loadingCategorias: true, errorCategorias: null }));
    try {
      const categorias = await CafeteriaService.getCategorias();
      setState(prev => ({ ...prev, categorias, loadingCategorias: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar categorías';
      setState(prev => ({ ...prev, errorCategorias: errorMessage, loadingCategorias: false }));
      addNotification({
        type: 'error',
        message: 'Error al cargar las categorías de la cafetería'
      });
    }
  }, [addNotification]);

  // Cargar productos por categoría
  const loadProductosByCategoria = useCallback(async (categoria: string) => {
    setState(prev => ({ ...prev, loadingProductos: true, errorProductos: null }));
    try {
      const productos = await CafeteriaService.getProductosByCategoria(categoria);
      setState(prev => ({ ...prev, productos, loadingProductos: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar productos';
      setState(prev => ({ ...prev, errorProductos: errorMessage, loadingProductos: false }));
      addNotification({
        type: 'error',
        message: `Error al cargar productos de la categoría "${categoria}"`
      });
    }
  }, [addNotification]);

  // Refetch categorías
  const refetchCategorias = useCallback(async () => {
    await loadCategorias();
  }, [loadCategorias]);

  // Refetch productos (requiere que ya haya una categoría seleccionada)
  const refetchProductos = useCallback(async () => {
    // Esta función será llamada desde el componente que sabe qué categoría recargar
    // Por ahora solo actualiza el estado de loading
    setState(prev => ({ ...prev, loadingProductos: true, errorProductos: null }));
  }, []);

  // Limpiar productos
  const clearProductos = useCallback(() => {
    setState(prev => ({ ...prev, productos: null, errorProductos: null }));
  }, []);

  // Cargar categorías al montar el hook
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
