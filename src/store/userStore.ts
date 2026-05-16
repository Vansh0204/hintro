import { create } from 'zustand';

interface UserStore {
  currentUserId: 'u1' | 'u2';
  setUserId: (id: 'u1' | 'u2') => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUserId: 'u1',
  setUserId: (id) => set({ currentUserId: id }),
}));
