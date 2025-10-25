/**
 * Custom React hooks for fetching and managing book data (libros) from the API.
 *
 * Provides hooks to fetch the list of books and individual book details, with loading, error, and refetch support.
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
 * Custom hook to fetch and manage the list of books.
 * Handles loading, error, and data states, and provides a refetch method.
 *
 * @returns {LibrosState & {refetch: () => void}} State object with data, loading, error, and refetch.
 */
export function useLibros() {
    const [state, setState] = useState<LibrosState>({data: null, loading: true, error: null});

    /**
     * Loads the list of books from the API.
     *
     * @param {boolean} [force=false] - If true, forces a reload from the API, bypassing cache.
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
 * Custom hook to fetch and manage a single book by ID.
 * Handles loading, error, and data states, and provides a refetch method.
 *
 * @param {string | undefined} id - The ID of the book to fetch.
 * @returns {LibroState & {refetch: () => void}} State object with data, loading, error, and refetch.
 */
export function useLibro(id: string | undefined) {
    const [state, setState] = useState<LibroState>({data: null, loading: !!id, error: null});

    /**
     * Loads a single book by ID from the API.
     *
     * @param {boolean} [force=false] - If true, forces a reload from the API, bypassing cache.
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
