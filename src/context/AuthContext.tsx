import {createContext, useContext} from 'react';
import type {AuthContextValue} from '../types';

/**
 * React Context for authentication state and actions.
 *
 * Provides the authentication context value throughout the component tree.
 * The context value type is defined by `AuthContextValue`.
 *
 * @see AuthContextValue
 */
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Custom hook to access the authentication context.
 *
 * Throws an error if used outside of an `AuthProvider`.
 *
 * @returns {AuthContextValue} The current authentication context value.
 * @throws {Error} If the hook is used outside of an `AuthProvider`.
 */
export function useAuthContext() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext debe usarse dentro de AuthProvider');
    return ctx;
}