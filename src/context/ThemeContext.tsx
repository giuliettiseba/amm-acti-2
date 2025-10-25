/**
 * ThemeContext and useTheme hook for global theme state management.
 *
 * Provides a React Context for theme state and actions, and a custom hook to access them.
 * The context value type is defined by ThemeContextType.
 *
 * @module ThemeContext
 * @context ThemeContext
 *
 * @see ThemeContextType
 */
import {createContext, useContext} from "react";
import type {ThemeContextType} from "../types/ThemeContextType.ts";

/**
 * React Context for theme state and actions.
 *
 * Provides the theme context value throughout the component tree.
 * The context value type is defined by ThemeContextType.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Custom hook to access the theme context.
 *
 * Throws an error if used outside of a ThemeProvider.
 *
 * @returns {ThemeContextType} The current theme context value.
 * @throws {Error} If the hook is used outside of a ThemeProvider.
 */
export function useTheme(): ThemeContextType {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
    return ctx;
}
