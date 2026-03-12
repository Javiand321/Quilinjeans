export interface Product {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  description: string;
  image: string;
  video?: string;
  category: 'Jeans' | 'Bragas' | 'Falda short' | 'Short' | 'Conjunto 1 (Chaqueta y jeans)' | 'Conjunto 2 (Chaqueta y Short)';
  sizes: string[];
  colors: string[];
  rating: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Mom Jeans High Waist Vintage',
    price: 89900,
    wholesalePrice: 65000,
    description: 'El clásico fit que nunca pasa de moda. Cintura alta y corte relajado para máxima comodidad y estilo.',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60',
    category: 'Jeans',
    sizes: ['6', '8', '10', '12', '14'],
    colors: ['Azul Claro', 'Azul Medio'],
    rating: 4.8
  },
  {
    id: '2',
    name: 'Skinny Fit Black Essential',
    price: 75900,
    description: 'Básicos que no pueden faltar. Tela super elástica que se ajusta perfectamente a tu silueta.',
    image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=60',
    category: 'Jeans',
    sizes: ['6', '8', '10', '12', '14'],
    colors: ['Negro'],
    rating: 4.9
  },
  {
    id: '3',
    name: 'Falda Short Retro Vibe',
    price: 95900,
    description: 'Estilo y comodidad en una sola prenda. Luce increíble con esta falda short.',
    image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&auto=format&fit=crop&q=60',
    category: 'Falda short',
    sizes: ['8', '10', '12'],
    colors: ['Azul Oscuro'],
    rating: 4.7
  },
  {
    id: '4',
    name: 'Denim Short Summer Love',
    price: 59900,
    description: 'Perfectos para días de sol. Con detalles desgastados y dobladillo deshilachado.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=60',
    category: 'Short',
    sizes: ['6', '8', '10', '12'],
    colors: ['Azul Claro', 'Blanco'],
    rating: 4.6
  },
  {
    id: '5',
    name: 'Braga Street Style',
    price: 105900,
    description: 'Tendencia total. Muchos bolsillos y un fit holgado para un look urbano y moderno.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=60',
    category: 'Bragas',
    sizes: ['8', '10', '12', '14'],
    colors: ['Beige', 'Verde Militar'],
    rating: 5.0
  },
  {
    id: '6',
    name: 'Conjunto Chaqueta y Jeans',
    price: 152900,
    description: 'El outfit completo. Combina a la perfección para un look total denim.',
    image: 'https://images.unsplash.com/photo-1576995853123-5a297f2899ce?w=800&auto=format&fit=crop&q=60',
    category: 'Conjunto 1 (Chaqueta y jeans)',
    sizes: ['6', '8', '10', '12'],
    colors: ['Azul Hielo'],
    rating: 4.5
  }
];
