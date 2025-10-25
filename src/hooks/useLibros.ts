import { useEffect, useState, useCallback } from 'react';
import type { Libro } from '../types';
import { getLibros, getLibroById } from '../services/libros.service';

interface LibrosState {
  data: Libro[] | null;
  loading: boolean;
  error: string | null;
}

export function useLibros() {
  const [state, setState] = useState<LibrosState>({ data: null, loading: true, error: null });

  const load = useCallback(async (force = false) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await getLibros(force);
      setState({ data, loading: false, error: null });
    } catch (e: any) {
      setState({ data: null, loading: false, error: e?.message || 'Error cargando libros' });
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { ...state, refetch: () => load(true) };
}

interface LibroState {
  data: Libro | null;
  loading: boolean;
  error: string | null;
}

export function useLibro(id: string | undefined) {
  const [state, setState] = useState<LibroState>({ data: null, loading: !!id, error: null });

  const load = useCallback(async (force = false) => {
    if (!id) return;
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await getLibroById(id, force);
      setState({ data, loading: false, error: null });
    } catch (e: any) {
      setState({ data: null, loading: false, error: e?.message || 'Error cargando libro' });
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  return { ...state, refetch: () => load(true) };
}

