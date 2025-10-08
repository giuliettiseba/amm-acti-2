import type { Libro, CoworkingSlot, AuthResponse } from './index';

// Tipo para productos de cafetería (migrado desde CafeteriaPage)
export interface ProductoCafe {
  id: string;
  nombre: string;
  precio: number;
  categoria?: string;
}

// Endpoints GET soportados
export type ApiGetEndpoint =
  | '/books'
  | `/books/${string}`
  | '/coworking'
  | '/menu';

// Respuesta según endpoint GET
export type ApiGetResponse<E extends ApiGetEndpoint> =
  E extends '/books' ? Libro[] :
  E extends `/books/${string}` ? Libro :
  E extends '/coworking' ? CoworkingSlot[] :
  E extends '/menu' ? ProductoCafe[] :
  never;

// Endpoints POST soportados
export type ApiPostEndpoint = '/login';

// Body esperado por endpoint POST
export type ApiPostBody<E extends ApiPostEndpoint> =
  E extends '/login' ? { email: string; password: string } : never;

// Respuesta POST
export type ApiPostResponse<E extends ApiPostEndpoint> =
  E extends '/login' ? AuthResponse : never;

// Helper para discriminar endpoint dinámico de libro por ID
export function isBookByIdEndpoint(path: string): path is `/books/${string}` {
  return path.startsWith('/books/') && path.split('/').length === 3;
}
