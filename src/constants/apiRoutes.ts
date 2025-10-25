// Definición centralizada de rutas de la API simulada
// Permite mapear conceptos de dominio (es/"libros") a endpoints reales (en/"books").

export const API_ROUTES = {
  BOOKS: '/books',
  BOOK_BY_ID: (id: string) => `/books/${id}`,
  LOGIN: '/login',
  COWORKING: '/coworking',
  MENU: '/products',
  CATEGORIES: '/products/categories',
  ROOMS: '/rooms',
  ROOM_RESERVATION: '/roomreservation',
  USERS: '/users',
  USER_BY_ID: (id: number) => `/users/${id}`,
  USER_LOGIN: '/users/login'
} as const;

export type ApiRouteKey = keyof typeof API_ROUTES;
