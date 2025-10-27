import type {nexusThemeInterface} from "../types/NexusThemeInterface.ts";

/**
 * Paleta de tema en modo oscuro para el sistema de diseno Nexus.
 * @type {nexusThemeInterface}
 */
export const nexusThemeDark: nexusThemeInterface = {
    palette: {
        primary: '#0ebd40',          // base morado
        secondary: '#a534ef',        // base naranja
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
 * Paleta de tema en modo claro para el sistema de diseno Nexus.
 * @type {nexusThemeInterface}
 */
export const nexusThemeLight: nexusThemeInterface = {
    palette: {
        primary: '#7e22ce',
        secondary: '#72ce22',
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

// Alias para compatibilidad hacia atras
/**
 * Exportacion por defecto para compatibilidad hacia atras (tema oscuro).
 * @type {nexusThemeInterface}
 */
export const nexusTheme: nexusThemeInterface = nexusThemeDark; // exportacion por defecto mantenida para compatibilidad hacia atras

/**
 * Objeto que mapea el modo de tema a la paleta de tema correspondiente.
 * @type {{dark: nexusThemeInterface, light: nexusThemeInterface}}
 */
export const themesByMode = {
    dark: nexusThemeDark,
    light: nexusThemeLight
};