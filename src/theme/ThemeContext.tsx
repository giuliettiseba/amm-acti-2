import {createContext} from "react";
import type {ThemeContextValue} from "./ThemeContextValue.ts";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
export default ThemeContext