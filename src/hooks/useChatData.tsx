import { useEffect, useState } from 'react';
import { CHAT_ID_INIT, DIALOGUES_INIT, MODEL_ID_INIT, PROMPT_INIT } from '@/pages/chat/constants';
import type { DialogueType } from '@/models/chat';
import useChatQuery from './queries/useChatQuery';
import useModelsQuery from './queries/useModelsQuery';
import useCombinedMutation from './queries/useCombinedMutation';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/chat';
import { useShallow } from 'zustand/shallow';

const useChatData = (chatId?: string) => {
  const navigate = useNavigate();
  const { setChatId } = useChatStore(useShallow((state) => state));

  const [model, setModel] = useState<string>(MODEL_ID_INIT);
  const [message, setMessage] = useState<string>(PROMPT_INIT);
  const [dialogues, setDialogues] = useState<DialogueType[] | null>(DIALOGUES_INIT);

  const { isLoading: chatIsLoading, data: chatQuery } = useChatQuery(chatId ?? CHAT_ID_INIT);
  const { isLoading: modelsQueryIsLoading, data: modelsQuery } = useModelsQuery();
  const { addNewChat, mutationDialogue } = useCombinedMutation();

  // NOTE: 대화 추가
  const addNewDialogue = () => {
    // 빈 문자열
    if (!message.trim()) return;

    // 대화 추가
    if (chatId) {
      // 기존 채팅
      mutationDialogue.mutate(
        { prompt: message, chatId },
        {
          onSuccess: (data) => {
            setDialogues(data);
            setMessage(PROMPT_INIT); // model & chatId 유지되는 경우라서 하드코딩함
          },
        },
      );
    } else {
      // 새 채팅
      addNewChat({
        modelId: model,
        prompt: message,
        callback: (newChatId) => {
          navigate(`/${newChatId}`);
          setChatId(newChatId);
        },
      });
    }
  };

  return {
    model,
    message,
    dialogues,
    chatQuery,
    modelsQuery,
    chatIsLoading,
    modelsQueryIsLoading,
    addNewDialogue,
    setModel,
    setMessage,
    setDialogues,
    mutationDialogue,
  };
};

export default useChatData;
