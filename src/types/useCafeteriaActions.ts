export interface UseCafeteriaActions {
    refetchCategorias: () => Promise<void>;
    refetchProductos: () => Promise<void>;
    loadProductosByCategoria: (categoria: string) => Promise<void>;
    clearProductos: () => void;
}