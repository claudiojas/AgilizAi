import { Product } from '@/components/features/ProductCard';

export const products: Product[] = [
  // Burgers
  {
    id: 'burger-1',
    name: 'Smash Burger Clássico',
    description: 'Dois hambúrgueres smash com queijo cheddar, cebola caramelizada e molho especial',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    category: 'burgers',
    prepTime: '15-20 min',
    isPopular: true,
  },
  {
    id: 'burger-2',
    name: 'Bacon Lover',
    description: 'Hambúrguer artesanal com bacon crocante, queijo e maionese de alho',
    price: 36.90,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80',
    category: 'burgers',
    prepTime: '18-25 min',
  },
  {
    id: 'burger-3',
    name: 'Veggie Deluxe',
    description: 'Hambúrguer de grão de bico com guacamole, tomate seco e rúcula',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=800&q=80',
    category: 'burgers',
    prepTime: '15-20 min',
    isNew: true,
  },

  // Pizzas
  {
    id: 'pizza-1',
    name: 'Margherita Supreme',
    description: 'Molho de tomate San Marzano, mozzarella de búfala e manjericão fresco',
    price: 54.90,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    category: 'pizzas',
    prepTime: '25-30 min',
    isPopular: true,
  },
  {
    id: 'pizza-2',
    name: 'Pepperoni Clássica',
    description: 'Pepperoni artesanal, queijo mozzarella e orégano',
    price: 49.90,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
    category: 'pizzas',
    prepTime: '25-30 min',
  },

  // Salads
  {
    id: 'salad-1',
    name: 'Caesar Salad Premium',
    description: 'Alface romana, croutons, parmesão e molho caesar especial da casa',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80',
    category: 'salads',
    prepTime: '10-15 min',
  },
  {
    id: 'salad-2',
    name: 'Bowl Mediterrâneo',
    description: 'Mix de folhas, tomate cereja, pepino, azeitonas e feta',
    price: 32.90,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    category: 'salads',
    prepTime: '10-15 min',
    isNew: true,
  },

  // Drinks
  {
    id: 'drink-1',
    name: 'Limonada Suíça',
    description: 'Limão siciliano batido com leite condensado e hortelã',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80',
    category: 'drinks',
    prepTime: '5 min',
    isPopular: true,
  },
  {
    id: 'drink-2',
    name: 'Suco Detox Verde',
    description: 'Couve, abacaxi, gengibre e hortelã fresca',
    price: 16.90,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80',
    category: 'drinks',
    prepTime: '5 min',
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Brownie Vulcão',
    description: 'Brownie quentinho com centro cremoso de chocolate belga',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80',
    category: 'desserts',
    prepTime: '10 min',
    isPopular: true,
  },
  {
    id: 'dessert-2',
    name: 'Cheesecake de Frutas',
    description: 'Cheesecake cremoso com calda de frutas vermelhas',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
    category: 'desserts',
    prepTime: '5 min',
  },

  // Coffee
  {
    id: 'coffee-1',
    name: 'Cappuccino Artesanal',
    description: 'Espresso duplo com leite vaporizado e espuma cremosa',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80',
    category: 'coffee',
    prepTime: '5 min',
  },
  {
    id: 'coffee-2',
    name: 'Café Gelado Especial',
    description: 'Cold brew 12h com baunilha e leite cremoso',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    category: 'coffee',
    prepTime: '3 min',
    isNew: true,
  },

  // Specials
  {
    id: 'special-1',
    name: 'Combo Família Feliz',
    description: '2 burgers, 1 pizza média, batata grande e 4 refrigerantes',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    category: 'specials',
    prepTime: '30-40 min',
    isPopular: true,
  },

  // Ice cream
  {
    id: 'icecream-1',
    name: 'Sundae Tropical',
    description: 'Sorvete de creme com calda de maracujá e manga',
    price: 18.90,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    category: 'icecream',
    prepTime: '5 min',
  },
  {
    id: 'icecream-2',
    name: 'Milkshake Oreo',
    description: 'Shake cremoso com biscoito Oreo e chantilly',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
    category: 'icecream',
    prepTime: '5 min',
    isPopular: true,
  },
];

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter((product) => product.category === categoryId);
};
