/**
 * Componente ThemeProvider para el estado global del tema y la integración con el tema de MUI.
 *
 * Este proveedor gestiona el modo de color de la aplicación (oscuro/claro), persiste la preferencia del usuario
 * y se sincroniza con el esquema de color del sistema. Expone el estado del tema y las acciones a través del contexto,
 * y conecta los tokens del tema personalizado con el ThemeProvider de Material UI para un estilo consistente.
 *
 * @module ThemeProvider
 * @context ThemeContext
 *
 * @param {ThemeProviderProps} props - Las propiedades del proveedor.
 * @param {React.ReactNode} props.children - Componentes hijos envueltos por el proveedor.
 * @param {object} [props.initialTheme] - Objeto de tema inicial opcional.
 * @param {ThemeMode} [props.initialMode] - Modo de color inicial opcional ('dark' o 'light').
 *
 * @returns {JSX.Element} El componente proveedor que envuelve a sus hijos.
 *
 * @example
 * <ThemeProvider initialMode="dark">
 *   <App />
 * </ThemeProvider>
 */
import {useEffect, useMemo, useState} from 'react';
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider} from '@mui/material';
import {nexusTheme, themesByMode} from '../theme/NexusTheme.ts';
import {ThemeContext} from '../context/ThemeContext.tsx';
import type {ThemeContextType} from '../types/ThemeContextType.ts';
import type {ThemeProviderProps} from "../types/props/ThemeProviderProps.ts";
import type {ThemeMode} from "../types/ThemeMode.ts";

/**
 * Clave de LocalStorage para persistir el modo de tema.
 * @constant {string}
 */
const LS_KEY = 'theme-mode';

/**
 * Resuelve el modo de tema inicial basado en la propiedad explícita, LocalStorage o la preferencia del sistema.
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
    // Estado para el modo de tema actual ('dark' o 'light').
    const [mode, setMode] = useState<ThemeMode>(() => resolveInitialMode(initialMode));
    // Estado para el objeto de tema actual (tokens/colores).
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
     * Valor memorizado del contexto para el estado del tema y las acciones.
     * @type {ThemeContextType}
     */
    const value: ThemeContextType = useMemo<ThemeContextType>(() => ({
        theme,
        mode,
        setMode,
        toggleMode: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
    }), [theme, mode]);

    /**
     * Objeto de tema de Material UI, conectado desde los tokens de tema personalizados.
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
