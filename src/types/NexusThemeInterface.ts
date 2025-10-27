/**
 * Paleta tematica triadica Nexus (Morado / Naranja / Verde)
 *
 * Centraliza tokens de tema para uso programatico y para inyeccion como variables CSS.
 *
 * Ambos temas oscuro y claro estan definidos, cada uno con una paleta de colores primarios, secundarios, acentuados y de estado,
 * asi como colores de fondo, superficie, borde y texto. Estos tokens se usan a lo largo de la aplicacion
 * para tematizacion consistente y se convierten en variables CSS en el ThemeProvider.
 *
 * Tokens adicionales (no mostrados aqui) pueden incluir spacingScale, transition, maxWidth, y globalCss.
 *
 * @module nexusTheme
 * @typedef {object} NexusTheme
 * @property {object} palette - Paleta de colores para el tema.
 * @property {string} palette.primary - Color primario.
 * @property {string} palette.secondary - Color secundario.
 * @property {string} [palette.accent] - Color de acento (solo tema claro).
 * @property {string} [palette.accentHover] - Color de acento al pasar el cursor (solo tema claro).
 * @property {string} palette.danger - Color de peligro (error).
 * @property {string} palette.warning - Color de advertencia.
 * @property {string} palette.info - Color de informacion.
 * @property {string} palette.success - Color de exito.
 * @property {string} palette.bg - Color de fondo.
 * @property {string} palette.surface - Color de superficie (tarjetas, hojas).
 * @property {string} palette.border - Color de borde.
 * @property {string} palette.text - Color de texto principal.
 * @property {string} palette.textDim - Color de texto atenuado/secundario.
 *
 * @property {"dark"|"light"} ThemeMode - Tipo de modo de tema.
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