import { motion } from 'framer-motion';
import { Home, Search, ClipboardList, User, ChefHat } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const mainNavItems: NavItem[] = [
  { icon: Home, label: 'Início', path: '/' },
  { icon: Search, label: 'Buscar', path: '/search' },
  { icon: ClipboardList, label: 'Meus Pedidos', path: '/orders' },
];

const secondaryNavItems: NavItem[] = [
  { icon: User, label: 'Minha Conta', path: '/profile' },
];

export const DesktopSidebar = () => {
  const location = useLocation();

  const NavLink = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <Link to={item.path}>
        <motion.div
          className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
            isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          {isActive && (
            <motion.div
              layoutId="desktopActiveTab"
              className="absolute inset-0 bg-accent rounded-2xl"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <Icon size={22} className="relative z-10" strokeWidth={isActive ? 2.5 : 2} />
          <span className="relative z-10 font-semibold">{item.label}</span>
        </motion.div>
      </Link>
    );
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-glow">
              <ChefHat className="text-primary-foreground" size={24} />
            </div>
          </motion.div>
          <div>
            <h1 className="font-bold text-lg text-foreground">AgilizAI</h1>
            <p className="text-xs text-muted-foreground">Cardápio Digital</p>
          </div>
        </Link>
      </div>


      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">
          Menu
        </p>
        {mainNavItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <NavLink item={item} />
          </motion.div>
        ))}

        <div className="pt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-3">
            Conta
          </p>
          {secondaryNavItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + 0.1 * index }}
            >
              <NavLink item={item} />
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-surface-glow rounded-2xl p-4"
        >
          <p className="text-sm font-semibold text-foreground">Fome agora?</p>
          <p className="text-xs text-muted-foreground mt-1">
            Veja nossos pratos mais pedidos!
          </p>
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-3 w-full bg-primary text-primary-foreground py-2 px-4 rounded-xl font-semibold text-sm shadow-glow"
            >
              Ver Destaques
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.aside>
  );
};
