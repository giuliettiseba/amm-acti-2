/**
 * Servicio para gestionar categorías y productos de la cafetería con caché en memoria.
 *
 * Proporciona métodos estáticos para obtener categorías y productos filtrados por categoría
 * desde la API, utilizando caché en memoria para evitar peticiones repetidas al backend.
 *
 * @module CafeteriaService
 */
import {apiGet} from './apiClient';
import {API_ROUTES} from '../constants/apiRoutes';
import type {CategoriaProducto, ProductoCafe} from '../types';

// Cache simple en memoria para evitar múltiples peticiones del mismo recurso
let categoriasCache: { data: CategoriaProducto[]; timestamp: number } | null = null;
const productosCache = new Map<string, { data: ProductoCafe[]; timestamp: number }>();
const CATEGORIAS_TTL_MS = 300_000; // 5 minutos (las categorías cambian poco)
const PRODUCTOS_TTL_MS = 60_000; // 1 minuto

/**
 * Servicio para gestionar categorías y productos de la cafetería
 */
export class CafeteriaService {
    /**
     * Obtiene todas las categorías de productos disponibles desde la API o desde caché si está vigente.
     *
     * @param {boolean} [force=false] - Si es true, fuerza la recarga desde la API ignorando la caché.
     * @returns {Promise<CategoriaProducto[]>} Promesa que resuelve con el array de categorías.
     */
    static async getCategorias(force = false): Promise<CategoriaProducto[]> {
        const now = Date.now();
        if (!force && categoriasCache && now - categoriasCache.timestamp < CATEGORIAS_TTL_MS) {
            return categoriasCache.data;
        }
        const data = await apiGet<CategoriaProducto[]>(API_ROUTES.CATEGORIES);
        categoriasCache = {data, timestamp: now};
        return data;
    }

    /**
     * Obtiene productos filtrados por categoría usando query parameters, con soporte de caché.
     *
     * @param {string} categoria - Nombre de la categoría a filtrar.
     * @param {boolean} [force=false] - Si es true, fuerza la recarga desde la API ignorando la caché.
     * @returns {Promise<ProductoCafe[]>} Promesa que resuelve con el array de productos de la categoría.
     */
    static async getProductosByCategoria(categoria: string, force = false): Promise<ProductoCafe[]> {
        const now = Date.now();
        const cached = productosCache.get(categoria);

        if (!force && cached && now - cached.timestamp < PRODUCTOS_TTL_MS) {
            return cached.data;
        }

        const url = `${API_ROUTES.MENU}?category=${encodeURIComponent(categoria)}`;
        const data = await apiGet<ProductoCafe[]>(url);
        productosCache.set(categoria, {data, timestamp: now});
        return data;
    }
}
