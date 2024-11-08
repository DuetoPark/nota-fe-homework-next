import { create } from 'zustand';
import { CHAT_ID_INIT } from '@/pages/chat/constants';

type ChatType = {
  click: number;
  chatId: string;
  setClick: () => void;
  setChatId: (newChatId: string) => void;
};

const useChatStore = create<ChatType>()((set) => ({
  click: 0,
  chatId: CHAT_ID_INIT,
  setClick: () => set((state) => ({ click: state.click + 1 })),
  setChatId: (newChatId) => set(() => ({ chatId: newChatId })),
}));

export { useChatStore };
