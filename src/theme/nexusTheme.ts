// Nexus triadic theme palette (Purple / Orange / Green)
// Se centralizan tokens para uso programático y para inyectar como CSS variables.


// Se añaden tokens adicionales: spacingScale, transition, maxWidth y globalCss.
// Los valores se convierten a variables CSS en ThemeProvider.
export const nexusThemeDark = {
    palette: {
        primary: '#0ebd40',          // purple base
        secondary: '#a534ef',        // orange base
        danger: '#dc2626',
        warning: '#f59e0b',
        info: '#6366f1',
        success: '#16a34a',
        bg: '#0f1115',
        surface: '#1f2430',
        border: '#323c4a',
        text: '#f1f5f9',
        textDim: '#94a3b8',
    },

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
    }
};

export const themesByMode = {
    dark: nexusThemeDark,
    light: nexusThemeLight
};

// Alias para compatibilidad hacia atrás
export const nexusTheme = nexusThemeDark; // default export kept for backward compatibility
export type NexusTheme = typeof nexusThemeDark;
export type ThemeMode = 'dark' | 'light';
