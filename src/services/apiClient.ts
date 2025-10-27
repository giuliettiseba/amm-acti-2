/**
 * Cliente API generico para la aplicacion.
 *
 * Proporciona funciones de utilidad para realizar solicitudes GET y POST tipadas a la API del backend,
 * con manejo de errores y configuracion de URL base.
 *
 * @module apiClient
 */
// Cliente API generico para la aplicacion

/**
 * La URL base para todas las solicitudes API.
 * Usa la variable de entorno VITE_API_BASE_URL o por defecto 'http://localhost:3000/api'.
 * @constant {string}
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

import type {ApiGetEndpoint, ApiGetResponse} from '../types/api';

/**
 * Realiza una solicitud GET al endpoint API especificado.
 *
 * @template T El tipo de respuesta esperado.
 * @param {string} endpoint - El endpoint API (relativo a API_BASE_URL).
 * @param {RequestInit} [options={}] - Opciones de fetch opcionales (encabezados, etc).
 * @returns {Promise<T>} La respuesta JSON parseada.
 * @throws {Error} Si la respuesta no es OK, lanza con el mensaje de error.
 */
export async function apiGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', ...(options.headers || {})},
        ...options,
    });
    if (!res.ok) {
        const message = await safeParseError(res);
        throw new Error(message || `Error ${res.status}`);
    }
    return await res.json() as Promise<T>;
}

/**
 * Realiza una solicitud POST al endpoint API especificado con un cuerpo JSON.
 *
 * @template T El tipo de respuesta esperado.
 * @template B El tipo de cuerpo de solicitud.
 * @param {string} endpoint - El endpoint API (relativo a API_BASE_URL).
 * @param {B} body - El cuerpo de solicitud a enviar como JSON.
 * @param {RequestInit} [options={}] - Opciones de fetch opcionales (encabezados, etc).
 * @returns {Promise<T>} La respuesta JSON parseada.
 * @throws {Error} Si la respuesta no es OK, lanza con el mensaje de error.
 */
export async function apiPost<T, B = unknown>(endpoint: string, body: B, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', ...(options.headers || {})},
        body: JSON.stringify(body),
        ...options,
    });
    if (!res.ok) {
        const message = await safeParseError(res);
        throw new Error(message || `Error ${res.status}`);
    }
    return await res.json() as Promise<T>;
}

/**
 * Realiza una solicitud GET tipada a un endpoint API conocido.
 *
 * @template E El tipo de endpoint (debe extender ApiGetEndpoint).
 * @param {E} endpoint - El endpoint API (relativo a API_BASE_URL).
 * @param {RequestInit} [options={}] - Opciones de fetch opcionales.
 * @returns {Promise<ApiGetResponse<E>>} La respuesta tipada para el endpoint.
 */
export async function apiGetTyped<E extends ApiGetEndpoint>(endpoint: E, options: RequestInit = {}): Promise<ApiGetResponse<E>> {
    return apiGet<ApiGetResponse<E>>(endpoint, options);
}

/**
 * Intenta parsear un mensaje de error de una respuesta fetch fallida.
 *
 * @param {Response} res - El objeto Response de fetch.
 * @returns {Promise<string|undefined>} El mensaje de error si se encuentra, de lo contrario undefined.
 * @private
 */
async function safeParseError(res: Response): Promise<string | undefined> {
    try {
        const data = await res.json();
        if (data && typeof data === 'object' && 'message' in data) return (data as any).message;
    } catch (e: any) {
        console.error('Error parsing error response:', e.message);
    }
    return undefined;
}

export {API_BASE_URL};
