import { Layout } from '@/components/navigation/Layout';
import { useOrders, Order, OrderStatus, formatCurrency, formatTimeElapsed } from '@/hooks/useOrders';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Clock, 
  Phone, 
  MapPin, 
  CreditCard,
  ChevronRight,
  CheckCircle,
  XCircle,
  ChefHat,
  Truck
} from 'lucide-react';
import { useState } from 'react';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pendente',
  preparing: 'Preparando',
  ready: 'Pronto',
  delivered: 'Entregue',
  canceled: 'Cancelado',
};

const statusActions: Record<OrderStatus, { next: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> } | null> = {
  pending: { next: 'preparing', label: 'Iniciar Preparo', icon: ChefHat },
  preparing: { next: 'ready', label: 'Marcar Pronto', icon: CheckCircle },
  ready: { next: 'delivered', label: 'Entregar', icon: Truck },
  delivered: null,
  canceled: null,
};

function OrderCard({ order, onSelect, onUpdateStatus }: { 
  order: Order; 
  onSelect: () => void;
  onUpdateStatus: (status: OrderStatus) => void;
}) {
  const action = statusActions[order.status];

  return (
    <div className="order-card">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display font-bold text-lg text-foreground">{order.id}</span>
            <Badge variant={order.status}>{statusLabels[order.status]}</Badge>
          </div>
          <p className="text-sm font-medium text-foreground">{order.customerName}</p>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-lg text-primary">
            {formatCurrency(order.total)}
          </p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{formatTimeElapsed(order.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-3">
        {order.items.slice(0, 2).map((item) => (
          <p key={item.id}>{item.quantity}x {item.name}</p>
        ))}
        {order.items.length > 2 && (
          <p className="text-primary">+{order.items.length - 2} mais</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="touch" className="flex-1" onClick={onSelect}>
          Ver Detalhes
          <ChevronRight className="h-4 w-4" />
        </Button>
        {action && (
          <Button 
            variant="default" 
            size="touch" 
            className="flex-1"
            onClick={() => onUpdateStatus(action.next)}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}

function OrderDetails({ order, onUpdateStatus, onClose }: { 
  order: Order; 
  onUpdateStatus: (status: OrderStatus) => void;
  onClose: () => void;
}) {
  const action = statusActions[order.status];

  const paymentLabels = {
    pix: 'PIX',
    card: 'Cartão',
    cash: 'Dinheiro',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl">{order.id}</span>
            <Badge variant={order.status}>{statusLabels[order.status]}</Badge>
          </div>
          <p className="text-muted-foreground">{formatTimeElapsed(order.createdAt)}</p>
        </div>
        <p className="font-display font-bold text-2xl text-primary">
          {formatCurrency(order.total)}
        </p>
      </div>

      {/* Customer Info */}
      <div className="bg-muted rounded-xl p-4 space-y-3">
        <h4 className="font-medium text-foreground">Cliente</h4>
        <div className="space-y-2">
          <p className="text-sm font-medium">{order.customerName}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {order.customerPhone}
          </div>
          {order.address && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {order.address}
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            {paymentLabels[order.paymentMethod]}
          </div>
        </div>
      </div>

      {/* Items */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Itens do Pedido</h4>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium">{item.quantity}x {item.name}</p>
                {item.notes && (
                  <p className="text-xs text-muted-foreground italic">"{item.notes}"</p>
                )}
              </div>
              <p className="text-sm font-medium">{formatCurrency(item.price)}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="font-medium">Total</span>
          <span className="font-display font-bold text-xl">{formatCurrency(order.total)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {order.status === 'pending' && (
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1"
            onClick={() => {
              onUpdateStatus('canceled');
              onClose();
            }}
          >
            <XCircle className="h-4 w-4" />
            Cancelar
          </Button>
        )}
        {action && (
          <Button 
            size="lg" 
            className="flex-1"
            onClick={() => {
              onUpdateStatus(action.next);
              onClose();
            }}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}

function KanbanColumn({ title, orders, status, onSelect, onUpdateStatus }: {
  title: string;
  orders: Order[];
  status: OrderStatus;
  onSelect: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}) {
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
        <Badge variant={status}>{orders.length}</Badge>
      </div>
      <div className="kanban-column space-y-3">
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhum pedido</p>
        ) : (
          orders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onSelect={() => onSelect(order)}
              onUpdateStatus={(status) => onUpdateStatus(order.id, status)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function OrderManager() {
  const { orders, updateOrderStatus, getOrdersByStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const isDesktop = useIsDesktop();

  const pendingOrders = getOrdersByStatus('pending');
  const preparingOrders = getOrdersByStatus('preparing');
  const readyOrders = getOrdersByStatus('ready');

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
  };

  return (
    <Layout title="Pedidos">
      <div className="animate-slide-up">
        {/* Desktop: Kanban View */}
        {isDesktop && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            <KanbanColumn 
              title="Pendentes" 
              orders={pendingOrders} 
              status="pending"
              onSelect={setSelectedOrder}
              onUpdateStatus={handleUpdateStatus}
            />
            <KanbanColumn 
              title="Preparando" 
              orders={preparingOrders} 
              status="preparing"
              onSelect={setSelectedOrder}
              onUpdateStatus={handleUpdateStatus}
            />
            <KanbanColumn 
              title="Prontos" 
              orders={readyOrders} 
              status="ready"
              onSelect={setSelectedOrder}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        )}

        {/* Mobile: Card Feed */}
        {!isDesktop && (
          <div className="space-y-4">
            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Badge variant="pending" className="cursor-pointer px-4 py-2">
                Pendentes ({pendingOrders.length})
              </Badge>
              <Badge variant="preparing" className="cursor-pointer px-4 py-2">
                Preparando ({preparingOrders.length})
              </Badge>
              <Badge variant="ready" className="cursor-pointer px-4 py-2">
                Prontos ({readyOrders.length})
              </Badge>
            </div>

            {/* Order Cards */}
            <div className="space-y-3">
              {[...pendingOrders, ...preparingOrders, ...readyOrders].map((order) => (
                <Sheet key={order.id}>
                  <SheetTrigger asChild>
                    <div>
                      <OrderCard 
                        order={order} 
                        onSelect={() => {}}
                        onUpdateStatus={(status) => handleUpdateStatus(order.id, status)}
                      />
                    </div>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
                    <SheetHeader>
                      <SheetTitle className="sr-only">Detalhes do Pedido</SheetTitle>
                    </SheetHeader>
                    <OrderDetails 
                      order={order} 
                      onUpdateStatus={(status) => handleUpdateStatus(order.id, status)}
                      onClose={() => {}}
                    />
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>
        )}

        {/* Desktop: Order Details Dialog */}
        {isDesktop && selectedOrder && (
          <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
            <SheetContent className="sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="sr-only">Detalhes do Pedido</SheetTitle>
              </SheetHeader>
              <OrderDetails 
                order={selectedOrder} 
                onUpdateStatus={(status) => handleUpdateStatus(selectedOrder.id, status)}
                onClose={() => setSelectedOrder(null)}
              />
            </SheetContent>
          </Sheet>
        )}
      </div>
    </Layout>
  );
}
