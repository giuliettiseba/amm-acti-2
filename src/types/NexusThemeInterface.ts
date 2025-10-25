/**
 * Nexus triadic theme palette (Purple / Orange / Green)
 *
 * Centralizes theme tokens for programmatic use and for injection as CSS variables.
 *
 * Both dark and light themes are defined, each with a palette of primary, secondary, accent, and status colors,
 * as well as background, surface, border, and text colors. These tokens are used throughout the application
 * for consistent theming and are converted to CSS variables in the ThemeProvider.
 *
 * Additional tokens (not shown here) may include spacingScale, transition, maxWidth, and globalCss.
 *
 * @module nexusTheme
 * @typedef {object} NexusTheme
 * @property {object} palette - Color palette for the theme.
 * @property {string} palette.primary - Primary color.
 * @property {string} palette.secondary - Secondary color.
 * @property {string} [palette.accent] - Accent color (light theme only).
 * @property {string} [palette.accentHover] - Accent hover color (light theme only).
 * @property {string} palette.danger - Danger (error) color.
 * @property {string} palette.warning - Warning color.
 * @property {string} palette.info - Info color.
 * @property {string} palette.success - Success color.
 * @property {string} palette.bg - Background color.
 * @property {string} palette.surface - Surface color (cards, sheets).
 * @property {string} palette.border - Border color.
 * @property {string} palette.text - Main text color.
 * @property {string} palette.textDim - Dimmed/secondary text color.
 *
 * @property {"dark"|"light"} ThemeMode - Theme mode type.
 *
 * @example
 * import { themesByMode } from './theme/nexusTheme';
 * const theme = themesByMode[mode];
 */


export interface nexusThemeInterface {
    palette: {
        primary: string;
        secondary: string;
        danger: string;
        warning: string;
        info: string;
        success: string;
        bg: string;
        surface: string;
        border: string;
        text: string;
        textDim: string;
    }
}