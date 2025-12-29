import { Link, useLocation } from 'react-router-dom';
import { ClipboardList, UtensilsCrossed, Store, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/orders', label: 'Pedidos', icon: ClipboardList },
  { path: '/menu', label: 'Cardápio', icon: UtensilsCrossed },
  { path: '/store', label: 'Loja', icon: Store },
  { path: '/profile', label: 'Perfil', icon: User },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg md:hidden">
      <div className="flex justify-around items-center h-16 px-2 safe-area-inset-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === '/orders' && location.pathname === '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-item flex-1 touch-target",
                isActive && "nav-item-active"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
