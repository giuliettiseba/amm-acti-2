import type {CarritoItem} from './CarritoItem';
import type {ProductoCafe} from './ProductoCafe';
import type {Libro} from './Libro';

export interface OrderContextType {
  carrito: CarritoItem[];
  agregarProducto: (producto: ProductoCafe, cantidad?: number) => void;
  agregarLibro: (libro: Libro, cantidad?: number) => void;
  quitarItem: (item: CarritoItem) => void;
  limpiarCarrito: () => void;
  actualizarCantidad: (item: CarritoItem, cantidad: number) => void;
}
