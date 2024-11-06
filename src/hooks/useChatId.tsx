import { CHAT_ID_INIT } from '@/pages/chat/constants';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

type CallbackType = (chatId: string) => void;

const useChatId = (callback?: CallbackType) => {
  const { chatId } = useParams();

  // chatId 변동에 따라 콜백 동작
  useEffect(() => {
    if (!callback) return;

    callback(chatId ?? CHAT_ID_INIT);
  }, [chatId]);

  return { chatId };
};

export default useChatId;
