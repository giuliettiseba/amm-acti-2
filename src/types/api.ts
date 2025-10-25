import type {CoworkingSlot, Libro} from './index';
import type {ProductoCafe} from './ProductoCafe';

// Endpoints GET soportados
export type ApiGetEndpoint =
    | '/books'
    | `/books/${string}`
    | '/coworking'
    | '/menu';

// Respuesta según endpoint GET
export type ApiGetResponse<E extends ApiGetEndpoint> =
    E extends '/books' ? Libro[] :
        E extends `/books/${string}` ? Libro :
            E extends '/coworking' ? CoworkingSlot[] :
                E extends '/menu' ? ProductoCafe[] :
                    never;
