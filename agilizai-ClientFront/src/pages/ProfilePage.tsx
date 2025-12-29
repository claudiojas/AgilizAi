import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, MapPin, CreditCard, Bell, HelpCircle, LogOut, 
  ChevronRight, Heart, Gift, Shield, Moon, Star
} from 'lucide-react';
import { useUserStore } from '@/store/userStore';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  description?: string;
  badge?: string;
  action?: () => void;
  path?: string; // Make menu items linkable
}

const menuSections: MenuItem[][] = [
  {
    title: 'Conta',
    items: [
      { icon: User, label: 'Dados Pessoais', description: 'Nome, email, telefone', path: '/profile/personal-data' },
      { icon: MapPin, label: 'Endereços', description: '2 endereços salvos', path: '/addresses' },
      { icon: CreditCard, label: 'Formas de Pagamento', description: 'Cartões e PIX', path: '/profile/payment-methods' },
    ],
  },
  // ... (rest of the sections remain the same)
];

// Helper component for the content of each menu item
const MenuItemContent = ({ item }: { item: MenuItem }) => {
    const Icon = item.icon;
    return (
        <>
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                <Icon size={20} className="text-foreground" />
            </div>
            <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">{item.label}</p>
                {item.description && (
                <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
            </div>
            {item.badge && (
                <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-lg">
                {item.badge}
                </span>
            )}
            <ChevronRight size={20} className="text-muted-foreground" />
        </>
    );
};


export const ProfilePage = () => {
  const { user } = useUserStore();

  // This is a static representation, we'll make the description dynamic later
  const updatedMenuSections = menuSections.map(section => ({
      ...section,
      items: section.items.map(item => {
          if (item.label === 'Endereços') {
              // Placeholder for dynamic address count
              // const { addresses } = useAddressStore.getState();
              // return { ...item, description: `${addresses.length} endereços salvos` };
          }
          return item;
      })
  }));


  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-6 safe-top"
      >
        <h1 className="text-2xl font-bold text-foreground">Perfil</h1>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-light/20 rounded-full blur-2xl" />
        
        <div className="relative flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-foreground/20"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm opacity-80">{user.email}</p>
            <p className="text-xs opacity-60 mt-1">{user.memberSince}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-primary-foreground/20">
          <div className="text-center">
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs opacity-80">Pedidos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">450</p>
            <p className="text-xs opacity-80">Pontos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs opacity-80">Favoritos</p>
          </div>
        </div>
      </motion.div>

      {/* Menu Sections */}
      <div className="px-4 mt-6 space-y-6">
        {updatedMenuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + sectionIndex * 0.1 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
              {section.items.map((item, itemIndex) => {
                const className = `w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors ${
                    itemIndex !== section.items.length - 1 ? 'border-b border-border' : ''
                }`;

                if (item.path) {
                    return (
                        <Link to={item.path} key={item.label} className={className}>
                            <MenuItemContent item={item} />
                        </Link>
                    )
                }

                return (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.98 }}
                    className={className}
                  >
                    <MenuItemContent item={item} />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 p-4 bg-destructive/10 text-destructive rounded-2xl font-semibold mt-6"
        >
          <LogOut size={20} />
          Sair da Conta
        </motion.button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground py-4">
          AgilizAI Lite v1.0.0
        </p>
      </div>
    </div>
  );
};
