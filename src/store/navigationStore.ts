import { create } from 'zustand';

export type PageId = 'home' | 'search' | 'orders' | 'profile';

interface NavigationState {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
}));
