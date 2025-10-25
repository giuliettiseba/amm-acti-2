import type {Libro} from "../index.ts";

export interface LibroState {
    data: Libro | null;
    loading: boolean;
    error: string | null;
}