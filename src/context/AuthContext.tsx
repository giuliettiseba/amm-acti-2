import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { apiPostTyped } from '../services/apiClient';
import { API_ROUTES } from '../constants/apiRoutes';
import type { Usuario } from '../types';

interface AuthContextValue {
  user: Usuario | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface Props { children: ReactNode }

// Clave de almacenamiento local para persistencia simple
const AUTH_KEY = 'nexus_auth_user';

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario persistido
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiPostTyped(API_ROUTES.LOGIN, { email, password });
      const usuario: Usuario = { ...res.usuario, token: res.token };
      setUser(usuario);
      localStorage.setItem(AUTH_KEY, JSON.stringify(usuario));
    } catch (e) {
      // Fallback para desarrollo offline: usuario mock
      console.warn('Fallo login contra API simulada, usando mock:', e);
      const mock: Usuario = { id: 'mock', nombre: 'Dev User', email };
      setUser(mock);
      localStorage.setItem(AUTH_KEY, JSON.stringify(mock));
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext debe usarse dentro de AuthProvider');
  return ctx;
}
