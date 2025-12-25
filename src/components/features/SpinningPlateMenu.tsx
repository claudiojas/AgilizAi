import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { Utensils, Wine, Salad, Cake, Coffee, Pizza, Sandwich, IceCream } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const categories: Category[] = [
  { id: 'burgers', name: 'Lanches', icon: Sandwich, color: 'hsl(24, 100%, 45%)' },
  { id: 'pizzas', name: 'Pizzas', icon: Pizza, color: 'hsl(0, 80%, 55%)' },
  { id: 'salads', name: 'Saladas', icon: Salad, color: 'hsl(122, 55%, 40%)' },
  { id: 'drinks', name: 'Bebidas', icon: Wine, color: 'hsl(200, 80%, 50%)' },
  { id: 'desserts', name: 'Sobremesas', icon: Cake, color: 'hsl(330, 70%, 55%)' },
  { id: 'coffee', name: 'Cafés', icon: Coffee, color: 'hsl(30, 60%, 35%)' },
  { id: 'specials', name: 'Especiais', icon: Utensils, color: 'hsl(45, 90%, 50%)' },
  { id: 'icecream', name: 'Sorvetes', icon: IceCream, color: 'hsl(280, 60%, 60%)' },
];

interface SpinningPlateMenuProps {
  onCategoryChange: (categoryId: string) => void;
  selectedCategory: string;
}

export const SpinningPlateMenu = ({ onCategoryChange, selectedCategory }: SpinningPlateMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const plateSize = 280;
  const iconRadius = 100;
  const angleStep = 360 / categories.length;
  
  // Calculate which category is at the top (selected position)
  const getSelectedIndex = (rot: number) => {
    const normalizedRotation = ((rot % 360) + 360) % 360;
    const index = Math.round(normalizedRotation / angleStep) % categories.length;
    return (categories.length - index) % categories.length;
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    
    // Add inertia-like behavior
    const velocity = info.velocity.x * 0.3;
    const currentRotation = rotation.get();
    const projectedRotation = currentRotation + velocity;
    
    // Snap to nearest category
    const snappedRotation = Math.round(projectedRotation / angleStep) * angleStep;
    
    animate(rotation, snappedRotation, {
      type: 'spring',
      stiffness: 200,
      damping: 30,
      onComplete: () => {
        const selectedIndex = getSelectedIndex(snappedRotation);
        onCategoryChange(categories[selectedIndex].id);
      },
    });
  };

  const handleCategoryClick = (index: number) => {
    const currentRotation = rotation.get();
    const currentSelectedIndex = getSelectedIndex(currentRotation);
    const diff = (currentSelectedIndex - index + categories.length) % categories.length;
    const shortestDiff = diff > categories.length / 2 ? diff - categories.length : diff;
    const targetRotation = currentRotation + shortestDiff * angleStep;
    
    animate(rotation, targetRotation, {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      onComplete: () => {
        onCategoryChange(categories[index].id);
      },
    });
  };

  // Background plate rotation
  const plateRotation = useTransform(rotation, (r) => r);

  return (
    <div className="relative w-full flex flex-col items-center py-4">
      {/* Selection indicator - Arrow pointing down */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-primary drop-shadow-lg" />
      </motion.div>

      {/* Plate Container */}
      <div 
        ref={containerRef}
        className="relative"
        style={{ width: plateSize, height: plateSize }}
      >
        {/* Background plate with texture */}
        <motion.div
          style={{ rotate: plateRotation }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-card via-card to-muted border-4 border-border shadow-medium"
        >
          {/* Decorative rings */}
          <div className="absolute inset-4 rounded-full border-2 border-border/50" />
          <div className="absolute inset-8 rounded-full border border-border/30" />
          
          {/* Slice lines */}
          {categories.map((_, index) => {
            const angle = index * angleStep;
            return (
              <div
                key={`line-${index}`}
                className="absolute top-1/2 left-1/2 w-1/2 h-px bg-border/40 origin-left"
                style={{ transform: `rotate(${angle}deg)` }}
              />
            );
          })}
        </motion.div>

        {/* Draggable overlay */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={() => setIsDragging(true)}
          onDrag={(_, info) => {
            rotation.set(rotation.get() + info.delta.x * 0.5);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
        />

        {/* Category Icons */}
        {categories.map((category, index) => {
          const angle = index * angleStep - 90; // Start from top
          const radians = (angle * Math.PI) / 180;
          const x = Math.cos(radians) * iconRadius;
          const y = Math.sin(radians) * iconRadius;
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.div
              key={category.id}
              style={{
                rotate: useTransform(rotation, (r) => -r + angle + 90),
                x: useTransform(rotation, (r) => {
                  const totalAngle = angle + r;
                  const rad = (totalAngle * Math.PI) / 180;
                  return Math.cos(rad) * iconRadius + plateSize / 2 - 28;
                }),
                y: useTransform(rotation, (r) => {
                  const totalAngle = angle + r;
                  const rad = (totalAngle * Math.PI) / 180;
                  return Math.sin(rad) * iconRadius + plateSize / 2 - 28;
                }),
              }}
              className="absolute w-14 h-14"
            >
              <motion.button
                onClick={() => handleCategoryClick(index)}
                whileTap={{ scale: 0.9 }}
                className={`w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'bg-primary text-primary-foreground shadow-glow scale-110'
                    : 'bg-card text-foreground shadow-soft hover:shadow-medium'
                }`}
                style={{
                  backgroundColor: isSelected ? category.color : undefined,
                }}
              >
                <Icon size={24} strokeWidth={isSelected ? 2.5 : 2} />
              </motion.button>
            </motion.div>
          );
        })}

        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow z-5">
          <span className="text-primary-foreground font-bold text-xs text-center leading-tight">
            GIRE<br/>AQUI
          </span>
        </div>
      </div>

      {/* Selected Category Label */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground">
          {categories.find((c) => c.id === selectedCategory)?.name}
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Deslize para explorar mais categorias
        </p>
      </motion.div>
    </div>
  );
};
