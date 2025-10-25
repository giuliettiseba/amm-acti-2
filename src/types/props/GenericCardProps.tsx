import type {CardProps} from "@mui/material/Card";

export interface GenericCardProps extends CardProps {
    title: string;
    subtitle?: string;
    category?: string;
    image?: string;
    description?: string;
    price?: number;
    isVisible?: boolean;
    addToCartText?: string;
    addToCart?: () => void;
    showDetails?: () => void;
}