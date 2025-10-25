import type {ReactNode} from "react";
import type {ThemeMode} from "../../theme/NexusTheme.ts";
import type {nexusThemeInterface} from "../NexusThemeInterface.ts";

export interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: nexusThemeInterface;
    initialMode?: ThemeMode;
}