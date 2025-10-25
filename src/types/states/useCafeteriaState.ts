import type {CategoriaProducto, ProductoCafe} from "../index.ts";

export interface UseCafeteriaState {
    categorias: CategoriaProducto[] | null;
    productos: ProductoCafe[] | null;
    loadingCategorias: boolean;
    loadingProductos: boolean;
    errorCategorias: string | null;
    errorProductos: string | null;
}