export interface ProductoCafe {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'bebidas' | 'desayunos' | 'bocadillos' | 'aperitivos';
}

