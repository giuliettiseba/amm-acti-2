import type {NexusTheme, ThemeMode} from "./nexusTheme.ts";

export interface ThemeContextValue {
    theme: NexusTheme;
    mode: ThemeMode;
    setMode: (m: ThemeMode) => void;
    toggleMode: () => void;
}