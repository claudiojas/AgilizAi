import { useState, useCallback } from 'react';

export interface StoreConfig {
  name: string;
  logo?: string;
  isOpen: boolean;
  menuUrl: string;
  paymentMethods: {
    pix: boolean;
    card: boolean;
    cash: boolean;
  };
}

const defaultStore: StoreConfig = {
  name: 'Pizzaria do João',
  isOpen: true,
  menuUrl: 'https://agiliz.ai/menu/pizzaria-do-joao',
  paymentMethods: {
    pix: true,
    card: true,
    cash: true,
  },
};

export function useStore() {
  const [store, setStore] = useState<StoreConfig>(defaultStore);

  const toggleStoreStatus = useCallback(() => {
    setStore(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const updateStore = useCallback((updates: Partial<StoreConfig>) => {
    setStore(prev => ({ ...prev, ...updates }));
  }, []);

  const copyMenuLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(store.menuUrl);
      return true;
    } catch {
      return false;
    }
  }, [store.menuUrl]);

  return {
    store,
    toggleStoreStatus,
    updateStore,
    copyMenuLink,
  };
}
