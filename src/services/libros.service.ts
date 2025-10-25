/**
 * Servicio para gestionar libros con caché en memoria.
 *
 * Proporciona funciones para obtener la lista de libros y libros individuales,
 * utilizando caché en memoria para evitar peticiones repetidas al backend.
 *
 * @module libros.service
 */
import {apiGetTyped} from './apiClient';
import type {Libro} from '../types';

// Cache simple en memoria para evitar múltiples peticiones del mismo recurso
const libroCache = new Map<string, Libro>();
let listaCache: { data: Libro[]; timestamp: number } | null = null;
const LISTA_TTL_MS = 60_000; // 1 minuto

/**
 * Obtiene la lista de libros desde la API o desde caché si está vigente.
 *
 * @param {boolean} [force=false] - Si es true, fuerza la recarga desde la API ignorando la caché.
 * @returns {Promise<Libro[]>} Promesa que resuelve con el array de libros.
 */
export async function getLibros(force = false): Promise<Libro[]> {
    const now = Date.now();
    if (!force && listaCache && now - listaCache.timestamp < LISTA_TTL_MS) {
        return listaCache.data;
    }
    const data = await apiGetTyped('/books');
    listaCache = {data, timestamp: now};
    // Precargar en cache individual
    data.forEach(l => libroCache.set(l.id, l));
    return data;
}

/**
 * Obtiene un libro por su ID desde la API o desde caché si está disponible.
 *
 * @param {string} id - El ID del libro a obtener.
 * @param {boolean} [force=false] - Si es true, fuerza la recarga desde la API ignorando la caché.
 * @returns {Promise<Libro>} Promesa que resuelve con el libro solicitado.
 */
export async function getLibroById(id: string, force = false): Promise<Libro> {
    if (!force && libroCache.has(id)) {
        return libroCache.get(id)!;
    }
    const data = await apiGetTyped(`/books/${id}`);
    libroCache.set(id, data);
    return data;
}
