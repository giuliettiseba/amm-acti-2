import {useCallback, useEffect, useState} from 'react';
import {roomsService} from '../services/rooms.service';
import type {RoomsState} from "../types/states/roomsState.ts";

/**
 * useRooms
 *
 * Hook personalizado de React para obtener y gestionar datos de salas de coworking desde la API.
 * Maneja estados de carga, error y datos, y proporciona un metodo refetch.
 *
 * @returns {RoomsState & {refetch: () => void}} Objeto de estado con data, loading, error y refetch.
 *
 * @example
 * const { data, loading, error, refetch } = useRooms();
 */

/**
 * Hook para gestionar datos de salas de coworking
 */
export const useRooms = () => {
    /**
     * Estado para la lista de salas, carga y error.
     */
    const [state, setState] = useState<RoomsState>({data: null, loading: true, error: null});

    /**
     * Carga la lista de salas desde la API.
     * Actualiza el estado de carga y error en consecuencia.
     *
     * @param {boolean} force - Si es true, evita cache y fuerza una recarga fresca
     */
    const load = useCallback(async (force = false) => {
        setState(prev => ({...prev, loading: true, error: null}));
        try {
            const data = await roomsService.getRooms(force);
            setState({data, loading: false, error: null});
        } catch (e: unknown) {
            setState({data: null, loading: false, error: e instanceof Error ? e.message : 'Error cargando salas'});
        }
    }, []);

    useEffect(() => {
        load(false).then(r => console.debug('Salas cargadas' + r));
    }, [load]);

    return {
        ...state,
        refetch: () => load(true) // Forzar evitar cache en refetch manual
    };
};
