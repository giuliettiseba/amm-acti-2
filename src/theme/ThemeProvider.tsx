/* eslint-disable react-refresh/only-export-components */
import {createContext, type ReactNode, useContext, useEffect, useMemo, useState} from 'react';
import type {ThemeMode} from './nexusTheme';
import {nexusTheme, type NexusTheme, themesByMode} from './nexusTheme';

interface ThemeContextValue {
  theme: NexusTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setTheme: (next: Partial<NexusTheme>) => void; // permite overrides parciales
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function camelToKebab(key: string) {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function applyThemeToRoot(theme: NexusTheme, mode?: ThemeMode) {
  const root = document.documentElement;
  if (mode) {
    root.dataset.theme = mode;
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(`theme-${mode}`);
  }
  const { palette, radius, shadow, spacingScale, transition, maxWidth } = theme;
  Object.entries(palette).forEach(([k, v]) => {
    root.style.setProperty(`--color-${camelToKebab(k)}`, String(v));
  });
  // Fondo y color de texto directos para asegurar repaint inmediato
  document.body.style.background = palette.bg;
  document.body.style.color = palette.text;
  Object.entries(radius).forEach(([k, v]) => {
    root.style.setProperty(`--radius-${camelToKebab(k)}`, String(v));
  });
  Object.entries(shadow).forEach(([k, v]) => {
    root.style.setProperty(`--shadow-${camelToKebab(k)}`, String(v));
  });
  if (spacingScale) {
    Object.entries(spacingScale).forEach(([k, v]) => root.style.setProperty(`--space-${k}`, String(v)));
  }
  if (transition) root.style.setProperty('--transition', String(transition));
  if (maxWidth) root.style.setProperty('--max-width', String(maxWidth));
}

interface Props { children: ReactNode; initialTheme?: NexusTheme; initialMode?: ThemeMode }

const LS_KEY = 'theme-mode';

function resolveInitialMode(explicit?: ThemeMode): ThemeMode {
  if (explicit) return explicit;
  try {
    const stored = localStorage.getItem(LS_KEY) as ThemeMode | null;
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

export function ThemeProvider({ children, initialTheme, initialMode }: Props) {
  const [mode, setModeState] = useState<ThemeMode>(() => resolveInitialMode(initialMode));
  const [current, setCurrent] = useState<NexusTheme>(() => initialTheme || themesByMode[mode] || nexusTheme);

  // Cuando cambia modo, actualizamos el theme base salvo que haya overrides manuales previos.
  useEffect(() => {
    setCurrent(() => themesByMode[mode]); // usar el tema base del modo, descartando palette previa
    try { localStorage.setItem(LS_KEY, mode); } catch { /* persist mode noop */ }
  }, [mode]);

  useEffect(() => {
    applyThemeToRoot(current, mode);
  }, [current, mode]);

  // Escuchar cambios del sistema si el usuario no ha elegido explícitamente (solo si no hay localStorage guardado)
  useEffect(() => {
    try {
      if (localStorage.getItem(LS_KEY)) return; // usuario ya eligió
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => setModeState(e.matches ? 'dark' : 'light');
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    } catch { /* noop */ }
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({
    theme: current,
    mode,
    setMode: (m) => setModeState(m),
    toggleMode: () => setModeState(prev => prev === 'dark' ? 'light' : 'dark'),
    setTheme: (next) => setCurrent(prev => ({
      ...prev,
      ...next,
      palette: { ...prev.palette, ...next.palette },
      radius: { ...prev.radius, ...next.radius },
      shadow: { ...prev.shadow, ...next.shadow }
    })),
    resetTheme: () => {
      const base = themesByMode[mode] || nexusTheme;
      setCurrent(base);
    }
  }), [current, mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return ctx;
}
