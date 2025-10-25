import type {Libro} from "../index.ts";

export interface DialogDetallesLibroProps {
    libro: Libro | null;
    open: boolean;
    onClose: () => void;
}