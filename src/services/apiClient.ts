/**
 * Generic API client for the application.
 *
 * Provides utility functions for making typed GET and POST requests to the backend API,
 * with error handling and base URL configuration.
 *
 * @module apiClient
 */
// Cliente API genérico para la aplicación

/**
 * The base URL for all API requests.
 * Uses the VITE_API_BASE_URL environment variable or defaults to 'http://localhost:3000/api'.
 * @constant {string}
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

import type {ApiGetEndpoint, ApiGetResponse} from '../types/api';

/**
 * Performs a GET request to the specified API endpoint.
 *
 * @template T The expected response type.
 * @param {string} endpoint - The API endpoint (relative to API_BASE_URL).
 * @param {RequestInit} [options={}] - Optional fetch options (headers, etc).
 * @returns {Promise<T>} The parsed JSON response.
 * @throws {Error} If the response is not OK, throws with the error message.
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
 * Performs a POST request to the specified API endpoint with a JSON body.
 *
 * @template T The expected response type.
 * @template B The request body type.
 * @param {string} endpoint - The API endpoint (relative to API_BASE_URL).
 * @param {B} body - The request body to send as JSON.
 * @param {RequestInit} [options={}] - Optional fetch options (headers, etc).
 * @returns {Promise<T>} The parsed JSON response.
 * @throws {Error} If the response is not OK, throws with the error message.
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
 * Performs a typed GET request to a known API endpoint.
 *
 * @template E The endpoint type (must extend ApiGetEndpoint).
 * @param {E} endpoint - The API endpoint (relative to API_BASE_URL).
 * @param {RequestInit} [options={}] - Optional fetch options.
 * @returns {Promise<ApiGetResponse<E>>} The typed response for the endpoint.
 */
export async function apiGetTyped<E extends ApiGetEndpoint>(endpoint: E, options: RequestInit = {}): Promise<ApiGetResponse<E>> {
    return apiGet<ApiGetResponse<E>>(endpoint, options);
}

/**
 * Attempts to parse an error message from a failed fetch Response.
 *
 * @param {Response} res - The fetch Response object.
 * @returns {Promise<string|undefined>} The error message if found, otherwise undefined.
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
