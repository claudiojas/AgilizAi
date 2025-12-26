import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NotificationsDrawer } from './NotificationsDrawer';
import { useAddressStore } from '@/store/addressStore';

export const MobileHeader = () => {
  const { scrollY } = useScroll();
  const getSelectedAddress = useAddressStore((state) => state.getSelectedAddress);
  const selectedAddress = getSelectedAddress();
  
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
        <Link to="/addresses">
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
              <p className="font-bold text-foreground text-sm truncate max-w-[150px]">
                {selectedAddress 
                  ? `${selectedAddress.street}, ${selectedAddress.number}`
                  : "Selecione um endereço"}
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <NotificationsDrawer />
          
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-glow"
            >
              <ChefHat size={20} className="text-primary-foreground" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};
