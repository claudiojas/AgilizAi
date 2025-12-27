import { motion } from 'framer-motion';
import { Search, Bell, MapPin } from 'lucide-react';

export const DesktopHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Location */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <MapPin size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Entregar em</p>
            <p className="font-semibold text-foreground">Rua das Flores, 123 • Jardim Primavera</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar pratos, bebidas..."
              className="w-full bg-muted/50 border border-border rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Notifications */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-soft hover:shadow-medium transition-shadow"
        >
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-bold">2</span>
          </span>
        </motion.button>
      </div>
    </motion.header>
  );
};
