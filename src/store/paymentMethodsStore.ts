import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PaymentMethod {
  id: string;
  brand: 'visa' | 'mastercard' | 'elo' | 'amex';
  last4: string;
  expiry: string;
  isPrimary: boolean;
}

interface PaymentMethodsState {
  methods: PaymentMethod[];
  addMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removeMethod: (id: string) => void;
  setPrimary: (id: string) => void;
}

const initialMethods: PaymentMethod[] = [
  {
    id: '1',
    brand: 'mastercard',
    last4: '1234',
    expiry: '12/28',
    isPrimary: true,
  },
  {
    id: '2',
    brand: 'visa',
    last4: '5678',
    expiry: '06/26',
    isPrimary: false,
  },
];

export const usePaymentMethodsStore = create<PaymentMethodsState>()(
  persist(
    (set) => ({
      methods: initialMethods,
      addMethod: (method) => {
        const newMethod = { ...method, id: new Date().toISOString() };
        set((state) => ({
          methods: [...state.methods, newMethod],
        }));
      },
      removeMethod: (id) => {
        set((state) => ({
          methods: state.methods.filter((method) => method.id !== id),
        }));
      },
      setPrimary: (id) => {
        set((state) => ({
          methods: state.methods.map((method) => ({
            ...method,
            isPrimary: method.id === id,
          })),
        }));
      },
    }),
    {
      name: 'payment-methods-storage',
    }
  )
);
