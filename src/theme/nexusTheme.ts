// Nexus triadic theme palette (Purple / Orange / Green)
// Se centralizan tokens para uso programático y para inyectar como CSS variables.


// Se añaden tokens adicionales: spacingScale, transition, maxWidth y globalCss.
// Los valores se convierten a variables CSS en ThemeProvider.
export const nexusThemeDark = {
  palette: {
    primary: '#7e22ce',          // purple base
    primaryHover: '#6d28d9',     // slightly deeper
    secondary: '#f59e0b',        // orange base
    secondaryHover: '#d97706',   // darker orange
    accent: '#16a34a',           // green base
    accentHover: '#15803d',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#6366f1',
    success: '#16a34a',
    bg: '#0f1115',
    bgAlt: '#181c23',
    surface: '#1f2430',
    surfaceAlt: '#27303d',
    border: '#323c4a',
    text: '#f1f5f9',
    textDim: '#94a3b8',
    overlay: 'rgba(0,0,0,.5)'
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '14px',
    full: '999px'
  },
  shadow: {
    sm: '0 2px 4px rgba(0,0,0,.25)',
    md: '0 4px 12px -2px rgba(0,0,0,.35)',
    lg: '0 8px 28px -4px rgba(0,0,0,.45)'
  },
  spacingScale: { 1: '.25rem', 2: '.5rem', 3: '.75rem', 4: '1rem', 5: '1.5rem', 6: '2rem' },
  transition: '160ms cubic-bezier(.4,0,.2,1)',
  maxWidth: '1120px',

};

export const nexusThemeLight = {
  palette: {
    primary: '#7e22ce',
    primaryHover: '#6d28d9',
    secondary: '#f59e0b',
    secondaryHover: '#d97706',
    accent: '#16a34a',
    accentHover: '#15803d',
    danger: '#dc2626',
    warning: '#d97706',
    info: '#5850ec',
    success: '#15803d',
    bg: '#f9fafb',
    bgAlt: '#f1f5f9',
    surface: '#ffffff',
    surfaceAlt: '#f3f4f6',
    border: '#d5d9e2',
    text: '#1e2230',
    textDim: '#64748b',
    overlay: 'rgba(0,0,0,.5)'
  },
  radius: { sm: '4px', md: '8px', lg: '14px', full: '999px' },
  shadow: { sm: '0 2px 4px rgba(0,0,0,.08)', md: '0 4px 12px -2px rgba(0,0,0,.15)', lg: '0 8px 28px -4px rgba(0,0,0,.18)' },
  spacingScale: { 1: '.25rem', 2: '.5rem', 3: '.75rem', 4: '1rem', 5: '1.5rem', 6: '2rem' },
  transition: '160ms cubic-bezier(.4,0,.2,1)',
  maxWidth: '1120px',

};

export const themesByMode = {
  dark: nexusThemeDark,
  light: nexusThemeLight
};

// Alias para compatibilidad hacia atrás
export const nexusTheme = nexusThemeDark; // default export kept for backward compatibility
export type NexusTheme = typeof nexusThemeDark;
export type ThemeMode = 'dark' | 'light';
