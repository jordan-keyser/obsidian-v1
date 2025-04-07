import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CallStore {
  grayUI: boolean;
  toggleGrayUI: () => void;

  showConversations: boolean;
  toggleShowConversations: () => void;

  showSupport: boolean;
  toggleShowSupport: () => void;
}

export const useCallStore = create<CallStore>()(persist(
  (set) => ({
    grayUI: false,
    toggleGrayUI: () => set(state => ({ grayUI: !state.grayUI })),

    showConversations: true,
    toggleShowConversations: () => set(state => ({ showConversations: !state.showConversations })),

    showSupport: true,
    toggleShowSupport: () => set(state => ({ showSupport: !state.showSupport })),
  }), {
    name: 'app-call',
  },
)); 