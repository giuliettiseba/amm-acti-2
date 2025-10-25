import type {ReactNode} from "react";
import type {NexusTheme, ThemeMode} from "./nexusTheme.ts";

export interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: NexusTheme;
    initialMode?: ThemeMode;
}