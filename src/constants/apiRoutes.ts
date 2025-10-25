// Definición centralizada de rutas de la API simulada
// Permite mapear conceptos de dominio (es/"libros") a endpoints reales (en/"books").

export const API_ROUTES = {
  BOOKS: '/books',
  LOGIN: '/login',
  COWORKING: '/coworking',
  MENU: '/products',
  CATEGORIES: '/products/categories',
  ROOMS: '/rooms',
  ROOM_RESERVATION: '/roomreservation',
  USERS: '/users',
  USER_LOGIN: '/users/login'
} as const;

