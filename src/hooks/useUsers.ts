import { useFetchApi } from './useFetchApi';
import { API_ROUTES } from '../constants/apiRoutes';
import type { User } from '../types';

/**
 * Hook para gestionar datos de usuarios
 */
export const useUsers = () => {
  return useFetchApi<User[]>(API_ROUTES.USERS, {
    resourceName: 'Usuarios'
  });
};

/**
 * Hook para obtener un usuario específico por ID
 */
export const useUser = (id: number) => {
  return useFetchApi<User>(API_ROUTES.USER_BY_ID(id), {
    resourceName: 'Usuario'
  });
};
