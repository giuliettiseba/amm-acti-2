import { useEffect, useState, useCallback } from 'react';
import { userService } from '../services/user.service';
import type { User } from '../types';

interface UsersState {
  data: User[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook para gestionar datos de usuarios
 */
export const useUsers = () => {
  const [state, setState] = useState<UsersState>({ data: null, loading: true, error: null });

  const load = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await userService.getUsers();
      setState({ data, loading: false, error: null });
    } catch (e: unknown) {
      setState({ data: null, loading: false, error: e instanceof Error ? e.message : 'Error cargando usuarios' });
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { ...state, refetch: () => load() };
};

/**
 * Hook para obtener un usuario específico por userName
 */
export const useUserByUserName = (userName: string) => {
  const { data: users, loading, error, refetch } = useUsers();
  const user = users?.find(u => u.username === userName) || null;
  return { data: user, loading, error, refetch };
};
