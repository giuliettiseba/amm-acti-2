/**
 * Componente AuthProvider para gestionar el estado y las acciones de autenticación.
 *
 * Este proveedor maneja el inicio de sesión, cierre de sesión y la persistencia de la sesión utilizando localStorage.
 * Expone el usuario actual, el estado de autenticación, el estado de carga y las acciones de autenticación a través del contexto.
 *
 * @module AuthProvider
 * @context AuthContext
 *
 * @param {AuthProviderProps} props - Las propiedades del proveedor.
 * @param {React.ReactNode} props.children - Componentes hijos envueltos por el proveedor.
 *
 * @returns {JSX.Element} El componente proveedor que envuelve a sus hijos.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
import {useCallback, useEffect, useState} from 'react';
import type {User} from '../types';
import {AuthContext} from '../context/AuthContext';
import {userService} from '../services/user.service';
import type {AuthProviderProps} from "../types/props/AuthProviderProps.tsx";

// Clave de almacenamiento local para persistencia simple
const AUTH_KEY = 'nexus_auth_user';

export function AuthProvider({children}: AuthProviderProps) {
    /**
     * Estado para el usuario autenticado actual.
     */
    const [user, setUser] = useState<User | null>(null);
    /**
     * Estado para el indicador de carga (por ejemplo, durante el inicio de sesión o la restauración de la sesión).
     */
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Cargar usuario persistido
        const raw = localStorage.getItem(AUTH_KEY);
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            } catch { /* ignorar */ }
        }
        setLoading(false);
    }, []);

    /**
     * Inicia sesión un usuario utilizando el userService y persiste la sesión.
     *
     * @param {string} username - El nombre de usuario para iniciar sesión.
     * @param {string} password - La contraseña para iniciar sesión.
     * @throws Lanza un error si el inicio de sesión falla.
     */
    const login = useCallback(async (username: string, password: string) => {
        setLoading(true);
        try {
            // Usar el endpoint de inicio de sesión de la API
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

    /**
     * Cierra la sesión del usuario actual y elimina la sesión de localStorage.
     */
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
