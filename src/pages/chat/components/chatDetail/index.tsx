import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useModelsQuery from '@/hooks/queries/useModelsQuery';
import useChatQuery from '@/hooks/queries/useChatQuery';
import useCombinedMutation from '@/hooks/queries/useCombinedMutation';
import { useChatStore } from '@/store/chat';
import {
  CHAT_ID_INIT,
  DIALOGUES_INIT,
  MODEL_ID_INIT,
  MODEL_ID_NEW,
  PROMPT_INIT,
} from '../../constants';
import type { DialogueType } from '@/models/chat';

import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import ModelSelect from '../ModelSelect';
import Dialoguelist from '../DialogList';

interface ChatDetailPropsType {
  chatId: string;
}

const ChatDetail = ({ chatId }: ChatDetailPropsType) => {
  const navigate = useNavigate();
  const { click } = useChatStore();

  const [model, setModel] = useState<string>(MODEL_ID_INIT);
  const [message, setMessage] = useState<string>(PROMPT_INIT);
  const [dialogues, setDialogues] = useState<DialogueType[] | null>(DIALOGUES_INIT);

  const { isLoading: chatIsLoading, data: chatQuery } = useChatQuery(chatId ?? CHAT_ID_INIT);
  const { isLoading: modelsQueryIsLoading, data: modelsQuery } = useModelsQuery();
  const { addNewChat, mutationDialogue } = useCombinedMutation();

  // 대화 추가
  const addNewDialogue = () => {
    if (!message.trim()) return;

    // 기존 채팅에 대화 추가
    if (chatId) {
      mutationDialogue.mutate(
        { prompt: message, chatId },
        {
          onSuccess(data) {
            setDialogues(data);
            setMessage(PROMPT_INIT);
          },
        },
      );
    }

    // 새 채팅 추가
    if (!chatId) {
      addNewChat({ modelId: model, prompt: message });
    }
  };

  // 추가하기 버튼 클릭할 때
  useEffect(() => {
    setModel(MODEL_ID_NEW);
    setMessage(PROMPT_INIT);
  }, [click]);

  // 모델 선택 값
  useEffect(() => {
    if (chatQuery) {
      setModel(chatQuery.chat_model_id);
      setDialogues(chatQuery.dialogues);
    }
  }, [chatQuery]);

  // 채팅방 이동할 때
  useEffect(() => {
    if (!chatId) {
      setDialogues(DIALOGUES_INIT);
    }

    setMessage(PROMPT_INIT);
  }, [chatId]);

  // 페이지 첫 진입
  useEffect(() => {
    setModel(MODEL_ID_INIT);
  }, []);

  return (
    <div>
      {modelsQueryIsLoading && <p>모델 리스트를 호출중입니다.</p>}
      {modelsQuery && (
        <ModelSelect
          modelList={modelsQuery}
          modelId={model}
          onSelectChange={(selectedModelId) => {
            navigate('/');
            setModel(selectedModelId);
            setMessage(PROMPT_INIT);
          }}
        />
      )}

      {chatIsLoading && <p>대화 내역을 호출중입니다.</p>}
      {dialogues && <Dialoguelist dialogueList={dialogues} />}
      {mutationDialogue.isPending && <p>"{message}"에 대한 답변을 생성중입니다.</p>}

      <form action="">
        <Textarea
          value={message}
          onTextInput={(message) => {
            setMessage(message);
          }}
          disabled={!model}
          placeholder="메세지를 입력하세요"
        />

        <Button type="button" onClick={addNewDialogue} disabled={!model}>
          프롬프트 보내기
        </Button>
      </form>
    </div>
  );
};

export default ChatDetail;
