/**
 * Hooks personalizados de React para obtener y gestionar datos de libros desde la API.
 *
 * Proporciona hooks para obtener la lista de libros y detalles de libros individuales, con soporte de carga, error y refetch.
 *
 * @module useLibros
 */
import {useCallback, useEffect, useState} from 'react';
import {getLibroById, getLibros} from '../services/libros.service';
import type {LibrosState} from "../types/states/librosState.ts";
import type {LibroState} from "../types/states/libroState.ts";

/**
 * useLibros
 *
 * Hook personalizado para obtener y gestionar la lista de libros.
 * Maneja estados de carga, error y datos, y proporciona un metodo refetch.
 *
 * @returns {LibrosState & {refetch: () => void}} Objeto de estado con data, loading, error y refetch.
 */
export function useLibros() {
    const [state, setState] = useState<LibrosState>({data: null, loading: true, error: null});

    /**
     * Carga la lista de libros desde la API.
     *
     * @param {boolean} [force=false] - Si es true, fuerza una recarga desde la API, evitando cache.
     */
    const load = useCallback(async (force = false) => {
        setState(prev => ({...prev, loading: true, error: null}));
        try {
            const data = await getLibros(force);
            setState({data, loading: false, error: null});
        } catch (e: any) {
            setState({data: null, loading: false, error: e?.message || 'Error cargando libros'});
        }
    }, []);

    useEffect(() => {
            load().then(r => console.debug('Libros cargados' + r)
            );
        }
        , [load]);

    return {...state, refetch: () => load(true)};
}

/**
 * useLibro
 *
 * Hook personalizado para obtener y gestionar un libro individual por ID.
 * Maneja estados de carga, error y datos, y proporciona un metodo refetch.
 *
 * @param {string | undefined} id - El ID del libro a obtener.
 * @returns {LibroState & {refetch: () => void}} Objeto de estado con data, loading, error y refetch.
 */
export function useLibro(id: string | undefined) {
    const [state, setState] = useState<LibroState>({data: null, loading: !!id, error: null});

    /**
     * Carga un libro individual por ID desde la API.
     *
     * @param {boolean} [force=false] - Si es true, fuerza una recarga desde la API, evitando cache.
     */
    const load = useCallback(async (force = false) => {
        if (!id) return;
        setState(prev => ({...prev, loading: true, error: null}));
        try {
            const data = await getLibroById(id, force);
            setState({data, loading: false, error: null});
        } catch (e: any) {
            setState({data: null, loading: false, error: e?.message || 'Error cargando libro'});
        }
    }, [id]);

    useEffect(() => {
        load().then(r => console.debug('Libro cargado' + r));
    }, [load]);

    return {...state, refetch: () => load(true)};
}
