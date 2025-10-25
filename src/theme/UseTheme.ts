import {useContext} from "react";
import ThemeContext from "./ThemeContext";
import type {ThemeContextValue} from "./ThemeContextValue";

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
    return ctx;
}
