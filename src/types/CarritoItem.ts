import type {ProductoCafe} from './ProductoCafe';
import type {Libro} from './Libro';

export type CarritoItem =
    | ({ tipo: 'producto'; producto: ProductoCafe } & { cantidad: number })
    | ({ tipo: 'libro'; libro: Libro } & { cantidad: number });

