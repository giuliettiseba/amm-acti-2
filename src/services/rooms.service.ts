import {apiGet, apiPost} from './apiClient';
import {API_ROUTES} from '../constants/apiRoutes';
import type {Room, RoomReservation} from '../types';

export const roomsService = {
    /**
     * Obtiene todas las salas disponibles
     */
    async getRooms(): Promise<Room[]> {
        return apiGet<Room[]>(API_ROUTES.ROOMS);
    },

    /**
     * Crea una nueva reserva de sala
     */
    async createReservation(reservation: Omit<RoomReservation, 'id'>): Promise<RoomReservation> {
        return apiPost<RoomReservation>(API_ROUTES.ROOM_RESERVATION, reservation);
    }
};
