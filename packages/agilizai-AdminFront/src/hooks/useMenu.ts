import { useState, useCallback } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

const mockMenuItems: MenuItem[] = [
  // Pizzas Tradicionais
  { id: '1', name: 'Pizza Calabresa', description: 'Calabresa fatiada, cebola e azeitonas', price: 49.90, category: 'pizzas-tradicionais', available: true },
  { id: '2', name: 'Pizza Margherita', description: 'Molho de tomate, mussarela, manjericão fresco', price: 42.90, category: 'pizzas-tradicionais', available: true },
  { id: '3', name: 'Pizza Portuguesa', description: 'Presunto, ovos, cebola, azeitonas e pimentão', price: 47.90, category: 'pizzas-tradicionais', available: true },
  { id: '4', name: 'Pizza 4 Queijos', description: 'Mussarela, provolone, gorgonzola e parmesão', price: 52.90, category: 'pizzas-tradicionais', available: false },
  
  // Pizzas Especiais
  { id: '5', name: 'Pizza Pepperoni', description: 'Pepperoni importado com mussarela especial', price: 54.90, category: 'pizzas-especiais', available: true },
  { id: '6', name: 'Pizza Frango com Catupiry', description: 'Frango desfiado com catupiry cremoso', price: 49.90, category: 'pizzas-especiais', available: true },
  { id: '7', name: 'Pizza Lombo Canadense', description: 'Lombo canadense, mussarela e catupiry', price: 56.90, category: 'pizzas-especiais', available: true },
  
  // Bebidas
  { id: '8', name: 'Refrigerante 2L', description: 'Coca-Cola, Guaraná ou Fanta', price: 12.00, category: 'bebidas', available: true },
  { id: '9', name: 'Água Mineral 500ml', description: 'Com ou sem gás', price: 4.00, category: 'bebidas', available: true },
  { id: '10', name: 'Cerveja Long Neck', description: 'Heineken, Stella Artois ou Corona', price: 8.00, category: 'bebidas', available: true },
  { id: '11', name: 'Suco Natural 500ml', description: 'Laranja, limão ou maracujá', price: 10.00, category: 'bebidas', available: false },
  
  // Sobremesas
  { id: '12', name: 'Pizza Doce Chocolate', description: 'Chocolate ao leite com granulado', price: 38.90, category: 'sobremesas', available: true },
  { id: '13', name: 'Pizza Doce Banana', description: 'Banana, canela e leite condensado', price: 36.90, category: 'sobremesas', available: true },
];

const categories = [
  { id: 'pizzas-tradicionais', name: 'Pizzas Tradicionais' },
  { id: 'pizzas-especiais', name: 'Pizzas Especiais' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'sobremesas', name: 'Sobremesas' },
];

export function useMenu() {
  const [items, setItems] = useState<MenuItem[]>(mockMenuItems);

  const toggleAvailability = useCallback((itemId: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
  }, []);

  const updateItem = useCallback((itemId: string, updates: Partial<MenuItem>) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  }, []);

  const getItemsByCategory = useCallback((categoryId: string) => {
    return items.filter(item => item.category === categoryId);
  }, [items]);

  const getGroupedItems = useCallback((): MenuCategory[] => {
    return categories.map(cat => ({
      ...cat,
      items: items.filter(item => item.category === cat.id),
    }));
  }, [items]);

  return {
    items,
    categories,
    toggleAvailability,
    updateItem,
    getItemsByCategory,
    getGroupedItems,
  };
}
