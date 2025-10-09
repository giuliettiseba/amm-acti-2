import { useFetchApi } from './useFetchApi';
import { API_ROUTES } from '../constants/apiRoutes';
import type { Room } from '../types';

/**
 * Hook para gestionar datos de salas de coworking
 */
export const useRooms = () => {
  return useFetchApi<Room[]>(API_ROUTES.ROOMS, {
    resourceName: 'Salas'
  });
};
