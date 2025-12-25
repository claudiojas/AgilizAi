import { motion } from 'framer-motion';
import { Home, Search, ClipboardList, User } from 'lucide-react';
import { useNavigationStore, PageId } from '@/store/navigationStore';

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: PageId;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Início', id: 'home' },
  { icon: Search, label: 'Buscar', id: 'search' },
  { icon: ClipboardList, label: 'Pedidos', id: 'orders' },
  { icon: User, label: 'Perfil', id: 'profile' },
];

export const MobileNav = () => {
  const { currentPage, setCurrentPage } = useNavigationStore();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border safe-bottom"
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className="relative flex flex-col items-center justify-center touch-target px-4 py-2"
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute inset-0 bg-accent rounded-2xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="relative z-10"
              >
                <Icon
                  size={24}
                  className={isActive ? 'text-primary' : 'text-muted-foreground'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>

              <motion.span
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0.7,
                  fontWeight: isActive ? 700 : 500,
                }}
                className={`text-xs mt-1 relative z-10 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
