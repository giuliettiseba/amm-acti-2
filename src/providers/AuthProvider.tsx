import {type ReactNode, useCallback, useEffect, useState} from 'react';
import type {User} from '../types';
import {AuthContext} from '../context/AuthContext';
import { useUserByUserName } from '../hooks/useUsers';

interface Props { children: ReactNode }

// Clave de almacenamiento local para persistencia simple
const AUTH_KEY = 'nexus_auth_user';

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userNameToSearch, setUserNameToSearch] = useState<string | null>(null);
  const { data: userByUserName, loading: userLoading } = useUserByUserName(userNameToSearch || '');
  const [pendingLogin, setPendingLogin] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    // Cargar usuario persistido
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  // Manejar login usando solo useUserByUserName
  useEffect(() => {
    if (!pendingLogin) return;
    if (userLoading) return;
    let mock: User | undefined = userByUserName || undefined;
    if (!mock) {
      mock = {
        id: 1,
        username: pendingLogin.email,
        password: '',
        firstName: 'Dev',
        lastName: 'User',
        phoneNumber: '+34 600 000 000',
        email: pendingLogin.email,
        company: 'Nexus Dev',
      };
    }
    setUser(mock);
    localStorage.setItem(AUTH_KEY, JSON.stringify(mock));
    setLoading(false);
    setPendingLogin(null);
  }, [userByUserName, userLoading, pendingLogin]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setUserNameToSearch(email);
    setPendingLogin({ email, password });
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
