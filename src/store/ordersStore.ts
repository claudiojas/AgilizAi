import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './cartStore';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery?: string;
  address: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, address: string) => string;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getActiveOrders: () => Order[];
  getPastOrders: () => Order[];
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [
        // Demo orders
        {
          id: 'order-demo-1',
          items: [
            { id: 'burger-1', name: 'Smash Burger Clássico', price: 32.90, quantity: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' },
            { id: 'drink-1', name: 'Limonada Suíça', price: 14.90, quantity: 2, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80' },
          ],
          total: 95.60,
          status: 'delivering',
          createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
          estimatedDelivery: '15-20 min',
          address: 'Rua das Flores, 123',
        },
        {
          id: 'order-demo-2',
          items: [
            { id: 'pizza-1', name: 'Margherita Supreme', price: 54.90, quantity: 1, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80' },
          ],
          total: 54.90,
          status: 'delivered',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          address: 'Rua das Flores, 123',
        },
      ],

      addOrder: (items, total, address) => {
        const orderId = `order-${Date.now()}`;
        const newOrder: Order = {
          id: orderId,
          items,
          total,
          status: 'preparing',
          createdAt: new Date(),
          estimatedDelivery: '30-45 min',
          address,
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return orderId;
      },

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        })),

      getActiveOrders: () =>
        get().orders.filter((o) => o.status === 'preparing' || o.status === 'delivering'),

      getPastOrders: () =>
        get().orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled'),
    }),
    {
      name: 'agilizai-orders',
    }
  )
);
