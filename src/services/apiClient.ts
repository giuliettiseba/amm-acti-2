// Cliente API genérico para la aplicación
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

import type { ApiGetEndpoint, ApiGetResponse, ApiPostEndpoint, ApiPostBody, ApiPostResponse } from '../types/api';

export async function apiGet<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const message = await safeParseError(res);
    throw new Error(message || `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T, B = unknown>(endpoint: string, body: B, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(body),
    ...options,
  });
  if (!res.ok) {
    const message = await safeParseError(res);
    throw new Error(message || `Error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function apiGetTyped<E extends ApiGetEndpoint>(endpoint: E, options: RequestInit = {}): Promise<ApiGetResponse<E>> {
  return apiGet<ApiGetResponse<E>>(endpoint, options);
}

export async function apiPostTyped<E extends ApiPostEndpoint>(endpoint: E, body: ApiPostBody<E>, options: RequestInit = {}): Promise<ApiPostResponse<E>> {
  return apiPost<ApiPostResponse<E>, ApiPostBody<E>>(endpoint, body, options);
}

async function safeParseError(res: Response): Promise<string | undefined> {
  try {
    const data = await res.json();
    if (data && typeof data === 'object' && 'message' in data) return (data as any).message;
  } catch (e:any) {
      console.error('Error parsing error response:', e.message);
  }
  return undefined;
}

export { API_BASE_URL };
