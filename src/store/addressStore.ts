import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  nickname: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressState {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  getSelectedAddress: () => Address | undefined;
}

const initialAddresses: Address[] = [
  {
    id: '1',
    nickname: 'Casa',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 4B',
    city: 'São Paulo',
    state: 'SP',
    zip: '01234-567',
  },
  {
    id: '2',
    nickname: 'Trabalho',
    street: 'Avenida Paulista',
    number: '1000',
    city: 'São Paulo',
    state: 'SP',
    zip: '01310-100',
  },
];

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: initialAddresses,
      selectedAddressId: initialAddresses[0]?.id ?? null,

      addAddress: (address) => {
        const newAddress = { ...address, id: new Date().toISOString() };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }));
      },

      updateAddress: (updatedAddress) => {
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address
          ),
        }));
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((address) => address.id !== id),
        }));
        // If the deleted address was the selected one, select the first one as fallback
        if (get().selectedAddressId === id) {
          const firstAddress = get().addresses[0];
          set({ selectedAddressId: firstAddress?.id ?? null });
        }
      },

      selectAddress: (id) => {
        set({ selectedAddressId: id });
      },

      getSelectedAddress: () => {
        const { addresses, selectedAddressId } = get();
        return addresses.find((a) => a.id === selectedAddressId);
      },
    }),
    {
      name: 'address-storage', // name for the localStorage key
    }
  )
);
