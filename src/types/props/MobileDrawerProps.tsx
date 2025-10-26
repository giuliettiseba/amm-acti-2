import type {NavItem} from "../NavItem.tsx";

export interface MobileDrawerProps {
    open: boolean;
    onClose: () => void;
    navItems: NavItem[];
    mode: 'light' | 'dark';
    toggleMode: () => void;
    isAuthenticated: boolean;
    onLogout: () => void;
}