/**
 * ThemeContext y hook useTheme para gestion global de estado de tema.
 *
 * Proporciona un Contexto de React para estado y acciones de tema, y un hook personalizado para acceder a ellos.
 * El tipo de valor del contexto esta definido por ThemeContextType.
 *
 * @module ThemeContext
 * @context ThemeContext
 *
 * @see ThemeContextType
 */
import {createContext, useContext} from "react";
import type {ThemeContextType} from "../types/ThemeContextType.ts";

/**
 * Contexto de React para estado y acciones de tema.
 *
 * Proporciona el valor del contexto de tema a traves del arbol de componentes.
 * El tipo de valor del contexto esta definido por ThemeContextType.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook personalizado para acceder al contexto de tema.
 *
 * Lanza un error si se usa fuera de un ThemeProvider.
 *
 * @returns {ThemeContextType} El valor actual del contexto de tema.
 * @throws {Error} Si el hook se usa fuera de un ThemeProvider.
 */
export function useTheme(): ThemeContextType {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
    return ctx;
}
