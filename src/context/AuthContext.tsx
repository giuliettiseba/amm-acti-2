import {createContext, useContext} from 'react';
import type {AuthContextValue} from '../types';

/**
 * Contexto de React para estado y acciones de autenticacion.
 *
 * Proporciona el valor del contexto de autenticacion a traves del arbol de componentes.
 * El tipo de valor del contexto esta definido por `AuthContextValue`.
 *
 * @see AuthContextValue
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de autenticacion.
 *
 * Lanza un error si se usa fuera de un `AuthProvider`.
 *
 * @returns {AuthContextValue} El valor actual del contexto de autenticacion.
 * @throws {Error} Si el hook se usa fuera de un `AuthProvider`.
 */
export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext debe usarse dentro de AuthProvider');
    return ctx;
}