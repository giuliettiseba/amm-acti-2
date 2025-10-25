import type {nexusThemeInterface} from "../types/NexusThemeInterface.ts";

/**
 * Dark mode theme palette for the Nexus design system.
 * @type {nexusThemeInterface}
 */
export const nexusThemeDark: nexusThemeInterface = {
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

/**
 * Light mode theme palette for the Nexus design system.
 * @type {nexusThemeInterface}
 */
export const nexusThemeLight: nexusThemeInterface = {
    palette: {
        primary: '#7e22ce',
        secondary: '#f59e0b',
        danger: '#dc2626',
        warning: '#d97706',
        info: '#5850ec',
        success: '#15803d',
        bg: '#f9fafb',
        surface: '#ffffff',
        border: '#d5d9e2',
        text: '#1e2230',
        textDim: '#64748b',
    }
};

/**
 * Object mapping theme mode to the corresponding theme palette.
 * @type {{dark: nexusThemeInterface, light: nexusThemeInterface}}
 */
export const themesByMode = {
    dark: nexusThemeDark,
    light: nexusThemeLight
};

// Alias para compatibilidad hacia atrás
/**
 * Default export for backward compatibility (dark theme).
 * @type {nexusThemeInterface}
 */
export const nexusTheme = nexusThemeDark; // default export kept for backward compatibility

/**
 * Type for theme mode.
 * @typedef {'dark' | 'light'} ThemeMode
 */
export type ThemeMode = 'dark' | 'light';