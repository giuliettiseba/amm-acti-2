import {useEffect, useMemo, useState} from 'react';
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider} from '@mui/material';
import {nexusTheme, themesByMode} from './nexusTheme';
import type {ThemeMode} from './nexusTheme';
import type {ThemeProviderProps} from './ThemeProviderProps.ts';
import ThemeContext from './ThemeContext.tsx';
import type {ThemeContextValue} from './ThemeContextValue.tsx';

const LS_KEY = 'theme-mode';

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
    const [mode, setMode] = useState<ThemeMode>(() => resolveInitialMode(initialMode));
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

    const value = useMemo<ThemeContextValue>(() => ({
        theme,
        mode,
        setMode,
        toggleMode: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
    }), [theme, mode]);

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
