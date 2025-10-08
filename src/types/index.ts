// Tipos compartidos de la aplicación
export interface Libro {
  id: string;
  titulo: string;
  autor: string;
  descripcion?: string;
  categoria?: string;
  precio?: number;
  imagen?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  avatar?: string;
  token?: string;
}

export interface CoworkingSlot {
  id: string;
  fecha: string; // ISO date
  hora: string;  // HH:mm
  disponible: boolean;
}

export interface AuthResponse {
  usuario: Usuario;
  token: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Tipos para la cafetería
export interface CategoriaProducto {
  nombre: string;
  imagen: string;
  descripcion: string;
}

export interface ProductoCafe {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'bebidas' | 'desayunos' | 'bocadillos' | 'aperitivos';
}
