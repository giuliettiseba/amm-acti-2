import type {ThemeMode} from "../theme/NexusTheme.ts";
import type {nexusThemeInterface} from "./NexusThemeInterface.ts";

export interface ThemeContextType {
    theme: nexusThemeInterface;
    mode: ThemeMode;
    setMode: (m: ThemeMode) => void;
    toggleMode: () => void;
}