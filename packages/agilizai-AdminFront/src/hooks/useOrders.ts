import { useState, useCallback } from 'react';

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'canceled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  address?: string;
  paymentMethod: 'pix' | 'card' | 'cash';
}

const mockOrders: Order[] = [
  {
    id: '#001',
    customerName: 'João Silva',
    customerPhone: '(11) 99999-1234',
    items: [
      { id: '1', name: 'Pizza Calabresa Grande', quantity: 1, price: 49.90 },
      { id: '2', name: 'Refrigerante 2L', quantity: 1, price: 12.00 },
    ],
    total: 61.90,
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60000),
    address: 'Rua das Flores, 123 - Centro',
    paymentMethod: 'pix',
  },
  {
    id: '#002',
    customerName: 'Maria Santos',
    customerPhone: '(11) 98888-5678',
    items: [
      { id: '3', name: 'Pizza Margherita Média', quantity: 1, price: 39.90 },
      { id: '4', name: 'Pizza Portuguesa Média', quantity: 1, price: 42.90 },
    ],
    total: 82.80,
    status: 'preparing',
    createdAt: new Date(Date.now() - 15 * 60000),
    address: 'Av. Brasil, 456 - Jardim',
    paymentMethod: 'card',
  },
  {
    id: '#003',
    customerName: 'Pedro Oliveira',
    customerPhone: '(11) 97777-9012',
    items: [
      { id: '5', name: 'Pizza 4 Queijos Grande', quantity: 2, price: 99.80 },
      { id: '6', name: 'Água Mineral', quantity: 2, price: 8.00 },
    ],
    total: 107.80,
    status: 'ready',
    createdAt: new Date(Date.now() - 25 * 60000),
    paymentMethod: 'cash',
  },
  {
    id: '#004',
    customerName: 'Ana Costa',
    customerPhone: '(11) 96666-3456',
    items: [
      { id: '7', name: 'Pizza Frango com Catupiry', quantity: 1, price: 47.90 },
    ],
    total: 47.90,
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 60000),
    address: 'Rua do Sol, 789',
    paymentMethod: 'pix',
  },
  {
    id: '#005',
    customerName: 'Carlos Mendes',
    customerPhone: '(11) 95555-7890',
    items: [
      { id: '8', name: 'Pizza Pepperoni Grande', quantity: 1, price: 52.90 },
      { id: '9', name: 'Cerveja Long Neck', quantity: 2, price: 16.00 },
    ],
    total: 68.90,
    status: 'delivered',
    createdAt: new Date(Date.now() - 45 * 60000),
    paymentMethod: 'card',
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  }, []);

  const getOrdersByStatus = useCallback((status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  const getTodayStats = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = orders.filter(order => order.createdAt >= today);
    const completedOrders = todayOrders.filter(o => o.status === 'delivered');
    
    return {
      totalOrders: todayOrders.length,
      totalRevenue: completedOrders.reduce((sum, o) => sum + o.total, 0),
      averageTicket: completedOrders.length > 0 
        ? completedOrders.reduce((sum, o) => sum + o.total, 0) / completedOrders.length 
        : 0,
    };
  }, [orders]);

  return {
    orders,
    updateOrderStatus,
    getOrdersByStatus,
    getTodayStats,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatTimeElapsed(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `${diffMins}min`;
  
  const diffHours = Math.floor(diffMins / 60);
  return `${diffHours}h ${diffMins % 60}min`;
}
