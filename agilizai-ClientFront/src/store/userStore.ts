import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
}

interface UserState {
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
}

const initialUser: UserProfile = {
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  memberSince: 'Membro desde Jan 2024',
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: initialUser,
      updateUser: (data) =>
        set((state) => ({
          user: { ...state.user, ...data },
        })),
    }),
    {
      name: 'user-profile-storage',
    }
  )
);
