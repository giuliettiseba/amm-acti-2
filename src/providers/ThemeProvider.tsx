/**
 * ThemeProvider component for global theme state and MUI theme integration.
 *
 * This provider manages the application's color mode (dark/light), persists the user's preference,
 * and synchronizes with the system color scheme. It exposes theme state and actions via context,
 * and bridges the custom theme tokens to Material UI's ThemeProvider for consistent styling.
 *
 * @module ThemeProvider
 * @context ThemeContext
 *
 * @param {ThemeProviderProps} props - The provider props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider.
 * @param {object} [props.initialTheme] - Optional initial theme object.
 * @param {ThemeMode} [props.initialMode] - Optional initial color mode ('dark' or 'light').
 *
 * @returns {JSX.Element} The provider component wrapping its children.
 *
 * @example
 * <ThemeProvider initialMode="dark">
 *   <App />
 * </ThemeProvider>
 */
import {useEffect, useMemo, useState} from 'react';
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider} from '@mui/material';
import type {ThemeMode} from '../theme/NexusTheme.ts';
import {nexusTheme, themesByMode} from '../theme/NexusTheme.ts';
import {ThemeContext} from '../context/ThemeContext.tsx';
import type {ThemeContextType} from '../types/ThemeContextType.ts';
import type {ThemeProviderProps} from "../types/props/ThemeProviderProps.ts";

/**
 * LocalStorage key for persisting the theme mode.
 * @constant {string}
 */
const LS_KEY = 'theme-mode';

/**
 * Resolves the initial theme mode based on explicit prop, localStorage, or system preference.
 *
 * @param {ThemeMode} [explicit] - Explicitly provided theme mode.
 * @returns {ThemeMode} The resolved theme mode ('dark' or 'light').
 */
function resolveInitialMode(explicit?: ThemeMode): ThemeMode {
    if (explicit) return explicit;
    try {
        const stored = localStorage.getItem(LS_KEY) as ThemeMode | null;
        if (stored === 'dark' || stored === 'light') return stored;
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
        return 'dark';
    }
}

export function ThemeProvider({children, initialTheme, initialMode}: ThemeProviderProps) {
    /**
     * State for the current theme mode ('dark' or 'light').
     * @type {[ThemeMode, Function]}
     */
    const [mode, setMode] = useState<ThemeMode>(() => resolveInitialMode(initialMode));
    /**
     * State for the current theme object (tokens/colors).
     * @type {[object, Function]}
     */
    const [theme, setThemeState] = useState(() => initialTheme ?? themesByMode[mode] ?? nexusTheme);

    useEffect(() => {
        setThemeState(themesByMode[mode] ?? nexusTheme);
        try {
            localStorage.setItem(LS_KEY, mode);
        } catch {
            console.warn('No se pudo guardar el tema en el almacenamiento local');
        }
    }, [mode]);

    useEffect(() => {
        try {
            if (localStorage.getItem(LS_KEY)) return;
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            const onChange = (e: MediaQueryListEvent) => setMode(e.matches ? 'dark' : 'light');
            mq.addEventListener('change', onChange);
            return () => mq.removeEventListener('change', onChange);
        } catch {
            console.warn('No se pudo detectar el tema del sistema');
        }
    }, []);

    /**
     * Memoized context value for theme state and actions.
     * @type {ThemeContextType}
     */
    const value = useMemo<ThemeContextType>(() => ({
        theme,
        mode,
        setMode,
        toggleMode: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
    }), [theme, mode]);

    /**
     * Material UI theme object, bridged from custom theme tokens.
     */
    const muiTheme = createTheme({
        palette: {
            mode,
            primary: {main: theme.palette.primary},
            secondary: {main: theme.palette.secondary},
            background: {default: theme.palette.bg, paper: theme.palette.surface},
            text: {primary: theme.palette.text, secondary: theme.palette.textDim},
            error: {main: theme.palette.danger},
            warning: {main: theme.palette.warning},
            info: {main: theme.palette.info},
            success: {main: theme.palette.success}
        },
    });

    return (
        <ThemeContext value={value}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline/>
                {children}
            </MuiThemeProvider>
        </ThemeContext>
    );
}
