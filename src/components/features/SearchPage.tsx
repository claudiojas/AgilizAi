import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, SlidersHorizontal, Clock, Flame, Leaf } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/components/features/ProductCard';
import { ProductCard } from '@/components/features/ProductCard';

const filters = [
  { id: 'all', label: 'Todos', icon: null },
  { id: 'popular', label: 'Populares', icon: Flame },
  { id: 'new', label: 'Novidades', icon: Clock },
  { id: 'vegetarian', label: 'Vegetariano', icon: Leaf },
];

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<'all' | 'cheap' | 'medium' | 'expensive'>('all');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (activeFilter === 'popular') {
      result = result.filter((p) => p.isPopular);
    } else if (activeFilter === 'new') {
      result = result.filter((p) => p.isNew);
    } else if (activeFilter === 'vegetarian') {
      result = result.filter((p) => 
        p.category === 'salads' || p.name.toLowerCase().includes('veggie')
      );
    }

    // Price filter
    if (priceRange === 'cheap') {
      result = result.filter((p) => p.price < 25);
    } else if (priceRange === 'medium') {
      result = result.filter((p) => p.price >= 25 && p.price < 50);
    } else if (priceRange === 'expensive') {
      result = result.filter((p) => p.price >= 50);
    }

    return result;
  }, [searchQuery, activeFilter, priceRange]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl px-4 pt-6 pb-4 safe-top"
      >
        <h1 className="text-2xl font-bold text-foreground mb-4">Buscar</h1>

        {/* Search Input */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar pratos, bebidas..."
            className="w-full bg-muted/50 border border-border rounded-2xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-muted rounded-full flex items-center justify-center"
            >
              <X size={14} className="text-muted-foreground" />
            </motion.button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {Icon && <Icon size={16} />}
                {filter.label}
              </motion.button>
            );
          })}
        </div>

        {/* Price Range */}
        <div className="flex gap-2 mt-3">
          {[
            { id: 'all', label: 'Qualquer preço' },
            { id: 'cheap', label: '< R$25' },
            { id: 'medium', label: 'R$25-50' },
            { id: 'expensive', label: '> R$50' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setPriceRange(range.id as typeof priceRange)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                priceRange === range.id
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted/50 text-muted-foreground'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      <div className="px-4 pb-24">
        <p className="text-sm text-muted-foreground mb-4">
          {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search size={40} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Nada encontrado</h3>
              <p className="text-muted-foreground mt-2 max-w-xs">
                Tente buscar por outro termo ou ajuste os filtros
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
