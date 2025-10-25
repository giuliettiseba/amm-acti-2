import type {Libro} from "../index.ts";

export interface LibrosState {
    data: Libro[] | null;
    loading: boolean;
    error: string | null;
}