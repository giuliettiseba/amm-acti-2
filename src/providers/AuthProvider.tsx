/**
 * AuthProvider component for managing authentication state and actions.
 *
 * This provider handles user login, logout, and session persistence using localStorage.
 * It exposes the current user, authentication status, loading state, and auth actions via context.
 *
 * @module AuthProvider
 * @context AuthContext
 *
 * @param {AuthProviderProps} props - The provider props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The provider component wrapping its children.
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
     * State for the current authenticated user.
     */
    const [user, setUser] = useState<User | null>(null);
    /**
     * State for loading status (e.g., during login or session restore).
     */
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Cargar usuario persistido
        const raw = localStorage.getItem(AUTH_KEY);
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            } catch { /* ignore */ }
        }
        setLoading(false);
    }, []);

    /**
     * Logs in a user using the userService and persists the session.
     *
     * @param {string} username - The username for login.
     * @param {string} password - The password for login.
     * @throws Will throw if login fails.
     */
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

    /**
     * Logs out the current user and clears the session from localStorage.
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
