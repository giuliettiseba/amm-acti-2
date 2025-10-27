/**
 * Servicio para gestionar salas de coworking con caché en memoria.
 *
 * Proporciona funciones para obtener la lista de salas y salas individuales,
 * utilizando caché en memoria para evitar peticiones repetidas al backend.
 * También permite crear reservas de salas.
 *
 * @module rooms.service
 */
import {apiGet, apiPost} from './apiClient';
import {API_ROUTES} from '../constants/apiRoutes';
import type {Room, RoomReservation} from '../types';

// Cache simple en memoria para evitar múltiples peticiones del mismo recurso
const roomCache = new Map<number, Room>();
let listaCache: { data: Room[]; timestamp: number } | null = null;
const LISTA_TTL_MS = 60_000; // 1 minuto

export const roomsService = {
    /**
     * Obtiene todas las salas disponibles desde la API o desde caché si está vigente.
     *
     * @param {boolean} [force=false] - Si es true, fuerza la recarga desde la API ignorando la caché.
     * @returns {Promise<Room[]>} Promesa que resuelve con el array de salas disponibles.
     */
    async getRooms(force = false): Promise<Room[]> {
        const now = Date.now();
        if (!force && listaCache && now - listaCache.timestamp < LISTA_TTL_MS) {
            return listaCache.data;
        }
        const data = await apiGet<Room[]>(API_ROUTES.ROOMS);
        listaCache = {data, timestamp: now};
        // Precargar en cache individual
        data.forEach(room => roomCache.set(room.id, room));
        return data;
    },
    /**
     * Crea una nueva reserva de sala e invalida la caché de salas.
     *
     * @param {Omit<RoomReservation, 'id'>} reservation - Datos de la reserva a crear (sin id).
     * @returns {Promise<RoomReservation>} Promesa que resuelve con la reserva creada.
     */
    async createReservation(reservation: Omit<RoomReservation, 'id'>): Promise<RoomReservation> {
        const result = await apiPost<RoomReservation>(API_ROUTES.ROOM_RESERVATION, reservation);
        // Invalidar caché de salas después de crear una reserva (la disponibilidad podría cambiar)
        this.clearRoomsCache();
        return result;
    },

    /**
     * Limpia toda la caché de salas.
     * Útil cuando se necesita forzar la recarga de datos desde el servidor.
     */
    clearRoomsCache(): void {
        roomCache.clear();
        listaCache = null;
    }
};
