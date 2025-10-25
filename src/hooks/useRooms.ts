import {useCallback, useEffect, useState} from 'react';
import {roomsService} from '../services/rooms.service';
import type {RoomsState} from "../types/states/roomsState.ts";

/**
 * useRooms
 *
 * Custom React hook to fetch and manage coworking room data from the API.
 * Handles loading, error, and data states, and provides a refetch method.
 *
 * @returns {RoomsState & {refetch: () => void}} State object with data, loading, error, and refetch.
 *
 * @example
 * const { data, loading, error, refetch } = useRooms();
 */

/**
 * Hook para gestionar datos de salas de coworking
 */
export const useRooms = () => {
    /**
     * State for the list of rooms, loading, and error.
     */
    const [state, setState] = useState<RoomsState>({data: null, loading: true, error: null});

    /**
     * Loads the list of rooms from the API.
     * Updates loading and error state accordingly.
     *
     * @param {boolean} force - If true, bypasses cache and forces a fresh fetch
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
        refetch: () => load(true) // Force cache bypass on manual refetch
    };
};
