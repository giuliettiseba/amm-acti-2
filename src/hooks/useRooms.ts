import {useCallback, useEffect, useState} from 'react';
import {roomsService} from '../services/rooms.service';
import type {Room} from '../types';

interface RoomsState {
    data: Room[] | null;
    loading: boolean;
    error: string | null;
}

/**
 * Hook para gestionar datos de salas de coworking
 */
export const useRooms = () => {
    const [state, setState] = useState<RoomsState>({data: null, loading: true, error: null});

    const load = useCallback(async () => {
        setState(prev => ({...prev, loading: true, error: null}));
        try {
            const data = await roomsService.getRooms();
            setState({data, loading: false, error: null});
        } catch (e: unknown) {
            setState({data: null, loading: false, error: e instanceof Error ? e.message : 'Error cargando salas'});
        }
    }, []);

    useEffect(() => {
        load().then(r => console.log('Salas cargadas' + r));
    }, [load]);

    return {...state, refetch: () => load()};
};
