import { motion } from 'framer-motion';
import { Utensils, Wine, Salad, Cake, Coffee, Pizza, Sandwich, IceCream } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { id: 'burgers', name: 'Lanches', icon: Sandwich },
  { id: 'pizzas', name: 'Pizzas', icon: Pizza },
  { id: 'salads', name: 'Saladas', icon: Salad },
  { id: 'drinks', name: 'Bebidas', icon: Wine },
  { id: 'desserts', name: 'Sobremesas', icon: Cake },
  { id: 'coffee', name: 'Cafés', icon: Coffee },
  { id: 'specials', name: 'Especiais', icon: Utensils },
  { id: 'icecream', name: 'Sorvetes', icon: IceCream },
];

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4 px-2">Categorias</h2>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'bg-card text-foreground shadow-soft hover:shadow-medium'
              }`}
            >
              <Icon size={20} strokeWidth={isSelected ? 2.5 : 2} />
              <span>{category.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
