/**
 * roomsService
 *
 * Servicio para gestionar salas y reservas de coworking.
 * Proporciona métodos para obtener la lista de salas disponibles y crear nuevas reservas,
 * utilizando el cliente API genérico para la comunicación con el backend.
 *
 * @module roomsService
 */
import {apiGet, apiPost} from './apiClient';
import {API_ROUTES} from '../constants/apiRoutes';
import type {Room, RoomReservation} from '../types';

export const roomsService = {
    /**
     * Obtiene todas las salas disponibles.
     *
     * @returns {Promise<Room[]>} Promesa que resuelve con el array de salas disponibles.
     */
    async getRooms(): Promise<Room[]> {
        return apiGet<Room[]>(API_ROUTES.ROOMS);
    },

    /**
     * Crea una nueva reserva de sala.
     *
     * @param {Omit<RoomReservation, 'id'>} reservation - Datos de la reserva a crear (sin id).
     * @returns {Promise<RoomReservation>} Promesa que resuelve con la reserva creada.
     */
    async createReservation(reservation: Omit<RoomReservation, 'id'>): Promise<RoomReservation> {
        return apiPost<RoomReservation>(API_ROUTES.ROOM_RESERVATION, reservation);
    }
};
