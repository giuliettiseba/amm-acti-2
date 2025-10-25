import {type ReactNode, useCallback, useEffect, useState} from 'react';
import type {User} from '../types';
import {AuthContext} from '../context/AuthContext';
import {userService} from '../services/user.service';

interface Props {
    children: ReactNode
}

// Clave de almacenamiento local para persistencia simple
const AUTH_KEY = 'nexus_auth_user';

export function AuthProvider({children}: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar usuario persistido
        const raw = localStorage.getItem(AUTH_KEY);
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            } catch { /* ignore */
            }
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        setLoading(true);
        try {
            // Use API login endpoint
            const response = await userService.login({username, password});
            setUser(response.user);
            localStorage.setItem(AUTH_KEY, JSON.stringify(response.user));
        } catch (e: any) {
            setUser(null);
            localStorage.removeItem(AUTH_KEY);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
    }, []);

    return (
        <AuthContext.Provider value={{user, isAuthenticated: !!user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
