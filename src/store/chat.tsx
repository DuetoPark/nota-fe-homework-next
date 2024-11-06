import { create } from 'zustand';

type ChatType = {
  click: boolean;
  setClick: () => void;
};

const useChatStore = create<ChatType>()((set) => ({
  click: false,
  setClick: () => set((state) => ({ click: !state.click })),
}));

export { useChatStore };
