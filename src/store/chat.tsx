import { create } from 'zustand';

import { ChatDataType } from '@/type/chat';
import { CHAT_LIST_INIT, NEW_CHAT_ID } from '@/pages/chat/constants';

type ChatType = {
  click: boolean;
  currentChatId: string;
  chatList: ChatDataType[] | null;
  setCurrentChatId: (chatId: string) => void;
  setChatList: (chatData: ChatDataType[] | ChatDataType) => void;
  setClick: () => void;
};

const useChatStore = create<ChatType>()((set) => ({
  click: false,
  currentChatId: NEW_CHAT_ID,
  chatList: CHAT_LIST_INIT,
  setCurrentChatId: (chatID) => set(() => ({ currentChatId: chatID })),
  setChatList: (chatData) =>
    set((state) => {
      if (state.chatList) {
        if (Array.isArray(chatData)) {
          return { chatList: [...state.chatList, ...chatData] };
        }

        return { chatList: [...state.chatList, chatData] };
      }

      if (Array.isArray(chatData)) {
        return { chatList: chatData };
      }

      return { chatList: [chatData] };
    }),

  setClick: () => set((state) => ({ click: !state.click })),
}));

export { useChatStore };
