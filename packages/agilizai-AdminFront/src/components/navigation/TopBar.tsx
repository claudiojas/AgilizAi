import { useStore } from '@/hooks/useStore';
import { Switch } from '@/components/ui/switch';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopBarProps {
  title?: string;
}

export function TopBar({ title }: TopBarProps) {
  const { store, toggleStoreStatus } = useStore();

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full transition-colors",
            store.isOpen ? "bg-store-open animate-pulse" : "bg-store-closed"
          )} />
          <span className={cn(
            "text-sm font-medium",
            store.isOpen ? "text-store-open" : "text-store-closed"
          )}>
            {store.isOpen ? 'Aberto' : 'Fechado'}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Switch
            checked={store.isOpen}
            onCheckedChange={toggleStoreStatus}
            className="data-[state=checked]:bg-store-open"
          />
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          {title && (
            <h1 className="font-display font-bold text-xl text-foreground">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              className="h-10 w-64 pl-10 pr-4 rounded-xl bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Store Status */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted">
            <div className={cn(
              "w-2 h-2 rounded-full transition-colors",
              store.isOpen ? "bg-store-open animate-pulse" : "bg-store-closed"
            )} />
            <span className="text-sm font-medium">
              Loja {store.isOpen ? 'Aberta' : 'Fechada'}
            </span>
            <Switch
              checked={store.isOpen}
              onCheckedChange={toggleStoreStatus}
              className="data-[state=checked]:bg-store-open"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
