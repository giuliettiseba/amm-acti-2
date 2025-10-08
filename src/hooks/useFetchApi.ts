import { useEffect, useState, useRef, useCallback } from 'react';
import { apiGet } from '../services/apiClient';
import { useNotification } from '../context/NotificationContext';
import type { ApiGetEndpoint, ApiGetResponse } from '../types/api';

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface Options<T> {
  enabled?: boolean;
  transform?: (raw: any) => T;
  immediate?: boolean;
  deps?: any[];
  notifyOnError?: boolean; // nuevo: dispara notificación global
  resourceName?: string;   // nombre amigable del recurso para el mensaje
}

/**
 * Custom hook genérico para obtener datos desde la API simulada.
 * Proporciona estados de data / loading / error y un método refetch.
 */
export function useFetchApi<E extends ApiGetEndpoint>(endpoint: E, options?: Options<ApiGetResponse<E>>): {
  data: ApiGetResponse<E> | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};
export function useFetchApi<T = unknown>(endpoint: string, options?: Options<T>): {
  data: T | null; loading: boolean; error: string | null; refetch: () => Promise<void>;
};
export function useFetchApi<T = unknown>(endpoint: string, options: Options<T> = {}) {
  const { enabled = true, immediate, transform, deps = [], notifyOnError = true, resourceName } = options;
  const { addNotification } = useNotification();
  const lastErrorRef = useRef<string | null>(null);
  const [state, setState] = useState<State<T>>({ data: null, loading: false, error: null });
  const abortRef = useRef<AbortController | null>(null);

  const active = (immediate ?? enabled);

  const fetchData = useCallback(async () => {
    if (!active) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const raw = await apiGet<any>(endpoint, { signal: controller.signal });
      const data = transform ? transform(raw) : raw;
      lastErrorRef.current = null; // reset error para permitir futuras notificaciones
      setState({ data, loading: false, error: null });
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      const message = e?.message || 'Error desconocido';
      setState({ data: null, loading: false, error: message });
      if (notifyOnError && lastErrorRef.current !== message) {
        lastErrorRef.current = message;
        const prefix = resourceName ? `(${resourceName}) ` : '';
        addNotification({ type: 'error', message: `${prefix}${message}` });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, active, transform, notifyOnError, resourceName, ...deps]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
