import { apiGet } from './apiClient';
import { API_ROUTES } from '../constants/apiRoutes';
import type { CategoriaProducto, ProductoCafe } from '../types';

/**
 * Servicio para gestionar categorías y productos de la cafetería
 */
export class CafeteriaService {
  /**
   * Obtiene todas las categorías de productos disponibles
   */
  static async getCategorias(): Promise<CategoriaProducto[]> {
    return apiGet<CategoriaProducto[]>(API_ROUTES.CATEGORIES);
  }

  /**
   * Obtiene productos filtrados por categoría usando query parameters
   */
  static async getProductosByCategoria(categoria: string): Promise<ProductoCafe[]> {
    const url = `${API_ROUTES.MENU}?category=${encodeURIComponent(categoria)}`;
    return apiGet<ProductoCafe[]>(url);
  }

  /**
   * Obtiene todos los productos (sin filtro de categoría)
   */
  static async getAllProductos(): Promise<ProductoCafe[]> {
    return apiGet<ProductoCafe[]>(API_ROUTES.MENU);
  }
}
