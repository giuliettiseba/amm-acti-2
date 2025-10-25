import type {ReactNode} from "react";

export interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode; // botón o enlace
    className?: string;
}