import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, MapPin, ChevronRight, CheckCircle2, Truck, ChefHat } from 'lucide-react';
import { useOrdersStore, Order } from '@/store/ordersStore';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusConfig = {
  preparing: {
    label: 'Preparando',
    icon: ChefHat,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  delivering: {
    label: 'A caminho',
    icon: Truck,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  delivered: {
    label: 'Entregue',
    icon: CheckCircle2,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  cancelled: {
    label: 'Cancelado',
    icon: Package,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
};

export const OrdersPage = () => {
  const { orders } = useOrdersStore();
  const activeOrders = orders.filter((o) => o.status === 'preparing' || o.status === 'delivering');
  const pastOrders = orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 pt-6 pb-4 safe-top"
      >
        <h1 className="text-2xl font-bold text-foreground">Meus Pedidos</h1>
        <p className="text-muted-foreground mt-1">Acompanhe seus pedidos em tempo real</p>
      </motion.div>

      <div className="px-4 pb-24">
        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Pedidos Ativos
            </h2>
            <div className="space-y-4">
              {activeOrders.map((order, index) => (
                <OrderCard key={order.id} order={order} index={index} isActive />
              ))}
            </div>
          </section>
        )}

        {/* Past Orders */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Histórico</h2>
          {pastOrders.length > 0 ? (
            <div className="space-y-4">
              {pastOrders.map((order, index) => (
                <OrderCard key={order.id} order={order} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                <Package size={36} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Nenhum pedido ainda</h3>
              <p className="text-muted-foreground mt-2">
                Seus pedidos aparecerão aqui
              </p>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  index: number;
  isActive?: boolean;
}

const OrderCard = ({ order, index, isActive }: OrderCardProps) => {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-card rounded-2xl p-4 shadow-soft ${isActive ? 'ring-2 ring-primary/20' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bgColor}`}>
            <StatusIcon size={20} className={status.color} />
          </div>
          <div>
            <p className={`text-sm font-semibold ${status.color}`}>{status.label}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true, locale: ptBR })}
            </p>
          </div>
        </div>
        {order.estimatedDelivery && isActive && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock size={14} />
            <span>{order.estimatedDelivery}</span>
          </div>
        )}
      </div>

      {/* Items Preview */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, i) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-card"
            />
          ))}
          {order.items.length > 3 && (
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground border-2 border-card">
              +{order.items.length - 3}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {order.items.map((i) => i.name).join(', ')}
          </p>
          <p className="text-xs text-muted-foreground">
            {order.items.reduce((acc, i) => acc + i.quantity, 0)} itens
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin size={14} />
          <span className="truncate max-w-[150px]">{order.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            R$ {order.total.toFixed(2).replace('.', ',')}
          </span>
          <ChevronRight size={20} className="text-muted-foreground" />
        </div>
      </div>

      {/* Progress bar for active orders */}
      {isActive && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="mt-3 h-1 bg-primary/20 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: order.status === 'delivering' ? '0%' : '-50%' }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary rounded-full"
            style={{ width: order.status === 'delivering' ? '75%' : '40%' }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};
