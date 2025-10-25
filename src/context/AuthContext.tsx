import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { userService, type LoginCredentials } from '../services/user.service';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
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
      const credentials: LoginCredentials = { email, password };
      const response = await userService.login(credentials);
      const userData: User = { ...response.user };
      // Compatibilidad para UI: nombre y avatar
      userData.nombre = userData.firstName || userData.username;
      userData.avatar = userData.avatar || undefined;
      setUser(userData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (e) {
      // Fallback para desarrollo offline: usuario mock
      console.warn('Fallo login contra API simulada, usando mock:', e);
      const mock: User = {
        id: 1,
        username: 'devuser',
        password: '', // No almacenar password en el estado
        firstName: 'Dev',
        lastName: 'User',
        phoneNumber: '+34 600 000 000',
        email,
        company: 'Nexus Dev'
      };
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
