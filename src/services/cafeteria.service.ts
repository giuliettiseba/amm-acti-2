/**
 * CafeteriaService
 *
 * Servicio para gestionar categorías y productos de la cafetería.
 * Proporciona métodos estáticos para obtener categorías y productos filtrados por categoría
 * desde la API, utilizando el cliente genérico apiGet.
 *
 * @module CafeteriaService
 */
import {apiGet} from './apiClient';
import {API_ROUTES} from '../constants/apiRoutes';
import type {CategoriaProducto, ProductoCafe} from '../types';

/**
 * Servicio para gestionar categorías y productos de la cafetería
 */
export class CafeteriaService {
    /**
     * Obtiene todas las categorías de productos disponibles.
     *
     * @returns {Promise<CategoriaProducto[]>} Promesa que resuelve con el array de categorías.
     */
    static async getCategorias(): Promise<CategoriaProducto[]> {
        return apiGet<CategoriaProducto[]>(API_ROUTES.CATEGORIES);
    }

    /**
     * Obtiene productos filtrados por categoría usando query parameters.
     *
     * @param {string} categoria - Nombre de la categoría a filtrar.
     * @returns {Promise<ProductoCafe[]>} Promesa que resuelve con el array de productos de la categoría.
     */
    static async getProductosByCategoria(categoria: string): Promise<ProductoCafe[]> {
        const url = `${API_ROUTES.MENU}?category=${encodeURIComponent(categoria)}`;
        return apiGet<ProductoCafe[]>(url);
    }
}
