import { motion } from 'framer-motion';
import { Plus, Heart, Clock } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  prepTime?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    });
    
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-3xl overflow-hidden shadow-soft card-lift"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
              NOVO
            </span>
          )}
          {product.isPopular && (
            <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              POPULAR
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'}
          />
        </motion.button>

        {/* Prep time */}
        {product.prepTime && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Clock size={14} className="text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">{product.prepTime}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>
        
        {/* Price & Add Button */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isAdding
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-primary text-primary-foreground shadow-glow'
            }`}
          >
            <motion.div
              animate={{ rotate: isAdding ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Plus size={24} strokeWidth={2.5} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
