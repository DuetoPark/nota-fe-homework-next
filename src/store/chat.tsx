import { create } from 'zustand';
import { CHAT_ID_INIT } from '@/pages/chat/constants';

type ChatType = {
  click: boolean;
  chatId: string;
  setClick: () => void;
  setChatId: (newChatId: string) => void;
};

const useChatStore = create<ChatType>()((set) => ({
  click: false,
  chatId: CHAT_ID_INIT,
  setClick: () => set((state) => ({ click: !state.click })),
  setChatId: (newChatId) => set(() => ({ chatId: newChatId })),
}));

export { useChatStore };
