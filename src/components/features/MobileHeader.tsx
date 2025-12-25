import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Bell, ChefHat } from 'lucide-react';

export const MobileHeader = () => {
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);
  const headerY = useTransform(scrollY, [0, 100], [0, -10]);

  return (
    <motion.header
      style={{ 
        opacity: headerOpacity,
        y: headerY,
      }}
      className="sticky top-0 z-30 px-4 pt-4 pb-3 safe-top"
    >
      <motion.div
        style={{
          backdropFilter: useTransform(headerBlur, (blur) => `blur(${blur}px)`),
        }}
        className="absolute inset-0 bg-background/80"
      />
      
      <div className="relative flex items-center justify-between">
        {/* Location */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <MapPin size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Entregar em</p>
            <p className="font-bold text-foreground text-sm">Rua das Flores, 123</p>
          </div>
        </motion.div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-soft"
          >
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-[10px] text-primary-foreground font-bold">2</span>
            </span>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow"
          >
            <ChefHat size={20} className="text-primary-foreground" />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
