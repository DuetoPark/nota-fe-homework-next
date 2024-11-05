import { create } from 'zustand';

import { ChatDataType } from '@/models/chat';
import { CHAT_LIST_INIT } from '@/pages/chat/constants';

type ChatType = {
  click: boolean;
  chatList: ChatDataType[] | null;
  setChatList: (chatData: ChatDataType[] | ChatDataType) => void;
  setClick: () => void;
};

const useChatStore = create<ChatType>()((set) => ({
  click: false,
  chatList: CHAT_LIST_INIT,
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
