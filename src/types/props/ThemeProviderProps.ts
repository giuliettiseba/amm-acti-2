import type {ReactNode} from "react";
import type {nexusThemeInterface} from "../NexusThemeInterface.ts";
import type {ThemeMode} from "../ThemeMode.ts";

export interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: nexusThemeInterface;
    initialMode?: ThemeMode;
}