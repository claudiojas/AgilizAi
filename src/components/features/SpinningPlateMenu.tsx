import { useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';
import { Utensils, Wine, Salad, Cake, Coffee, Pizza, Sandwich, IceCream } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const categories: Category[] = [
  { id: 'burgers', name: 'Lanches', icon: Sandwich, color: 'hsl(var(--primary))' },
  { id: 'pizzas', name: 'Pizzas', icon: Pizza, color: 'hsl(0, 80%, 55%)' },
  { id: 'salads', name: 'Saladas', icon: Salad, color: 'hsl(var(--secondary))' },
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
  const velocityRef = useRef(0);
  
  const plateSize = 280;
  const iconRadius = 100;
  const angleStep = 360 / categories.length;

  // Memoized calculation for selected index
  const getSelectedIndex = useCallback((rot: number) => {
    const normalizedRotation = ((rot % 360) + 360) % 360;
    const index = Math.round(normalizedRotation / angleStep) % categories.length;
    return (categories.length - index) % categories.length;
  }, [angleStep]);

  const handleDrag = useCallback((_: any, info: PanInfo) => {
    const sensitivity = 0.5;
    const newRotation = rotation.get() + info.delta.x * sensitivity;
    rotation.set(newRotation);
    velocityRef.current = info.velocity.x;
  }, [rotation]);

  const handleDragEnd = useCallback(() => {
    const velocity = velocityRef.current * 0.15;
    const currentRotation = rotation.get();
    const projectedRotation = currentRotation + velocity;
    
    // Snap to nearest category with smooth spring physics
    const snappedRotation = Math.round(projectedRotation / angleStep) * angleStep;
    
    animate(rotation, snappedRotation, {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      mass: 0.8,
      onComplete: () => {
        const selectedIndex = getSelectedIndex(snappedRotation);
        onCategoryChange(categories[selectedIndex].id);
      },
    });
  }, [rotation, angleStep, getSelectedIndex, onCategoryChange]);

  const handleCategoryClick = useCallback((index: number) => {
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
  }, [rotation, getSelectedIndex, angleStep, onCategoryChange]);

  // Memoized category rendering
  const categoryIcons = useMemo(() => {
    return categories.map((category, index) => {
      const baseAngle = index * angleStep - 90;
      return (
        <CategoryIcon
          key={category.id}
          category={category}
          index={index}
          baseAngle={baseAngle}
          rotation={rotation}
          plateSize={plateSize}
          iconRadius={iconRadius}
          isSelected={selectedCategory === category.id}
          onClick={() => handleCategoryClick(index)}
        />
      );
    });
  }, [selectedCategory, handleCategoryClick, rotation, angleStep]);

  return (
    <div className="relative w-full flex flex-col items-center py-4">
      {/* Selection indicator */}
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
        className="relative touch-none"
        style={{ width: plateSize, height: plateSize }}
      >
        {/* Background plate */}
        <motion.div
          style={{ rotate: rotation }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-card via-card to-muted border-4 border-border shadow-medium will-change-transform"
        >
          <div className="absolute inset-4 rounded-full border-2 border-border/50" />
          <div className="absolute inset-8 rounded-full border border-border/30" />
          
          {categories.map((_, index) => (
            <div
              key={`line-${index}`}
              className="absolute top-1/2 left-1/2 w-1/2 h-px bg-border/40 origin-left"
              style={{ transform: `rotate(${index * angleStep}deg)` }}
            />
          ))}
        </motion.div>

        {/* Drag overlay */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          dragMomentum={false}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing z-10 rounded-full"
        />

        {/* Category Icons */}
        {categoryIcons}

        {/* Center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow z-[5]">
          <span className="text-primary-foreground font-bold text-xs text-center leading-tight select-none">
            GIRE<br/>AQUI
          </span>
        </div>
      </div>

      {/* Selected Category Label */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
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

// Separate component for better performance
interface CategoryIconProps {
  category: Category;
  index: number;
  baseAngle: number;
  rotation: ReturnType<typeof useMotionValue<number>>;
  plateSize: number;
  iconRadius: number;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryIcon = ({ 
  category, 
  baseAngle, 
  rotation, 
  plateSize, 
  iconRadius, 
  isSelected, 
  onClick 
}: CategoryIconProps) => {
  const Icon = category.icon;
  const iconSize = 56;
  const halfIcon = iconSize / 2;

  // Transform values with GPU acceleration
  const x = useTransform(rotation, (r) => {
    const totalAngle = baseAngle + r;
    const rad = (totalAngle * Math.PI) / 180;
    return Math.cos(rad) * iconRadius + plateSize / 2 - halfIcon;
  });

  const y = useTransform(rotation, (r) => {
    const totalAngle = baseAngle + r;
    const rad = (totalAngle * Math.PI) / 180;
    return Math.sin(rad) * iconRadius + plateSize / 2 - halfIcon;
  });

  // Keep icons upright
  const iconRotate = useTransform(rotation, (r) => -r);

  return (
    <motion.div
      style={{ x, y, rotate: iconRotate }}
      className="absolute will-change-transform"
    >
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
          isSelected
            ? 'text-primary-foreground shadow-glow scale-110'
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
};
