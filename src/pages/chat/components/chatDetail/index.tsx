import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createChat } from '@/apis/chat';
import useModelsQuery from '@/hooks/queries/useModelsQuery';
import useChatQuery from '@/hooks/queries/useChatQuery';
import useDialoguesMutation from '@/hooks/queries/useDialogueMutation';
import { useChatStore } from '@/store/chat';
import { DIALOGUES_INIT, MODEL_INIT, NEW_CHAT_ID, PROMPT_INIT } from '../../constants';
import type { DialogueType } from '@/models/chat';

import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import ModelSelect from './ModelSelect';
import Dialoguelist from './DialogList';

const ChatDetail = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const [model, setModel] = useState<string>(MODEL_INIT);
  const [message, setMessage] = useState<string>(PROMPT_INIT);
  const [dialogues, setDialogues] = useState<DialogueType[] | null>(DIALOGUES_INIT);
  const { click } = useChatStore();

  const { isLoading: chatIsLoading, data: chatQuery } = useChatQuery(chatId ?? NEW_CHAT_ID);
  const { isLoading: modelsQueryIsLoading, data: modelsQuery } = useModelsQuery();
  const { isPending: dialogueIsPending, mutate: addDialogue } = useDialoguesMutation();

  // 대화 추가
  const addNewDialogue = () => {
    if (!message.trim()) return;

    if (chatId) {
      addDialogue(
        { prompt: message, chatId },
        {
          onSuccess(data) {
            setDialogues(data);
            setMessage(PROMPT_INIT);
          },
        },
      );
    }

    if (!chatId) {
      createChat(model)
        .then((res) => res.at(-1)?.chat_id)
        .then((newChatId) => {
          addDialogue(
            { prompt: message, chatId: newChatId },
            {
              onSuccess(data) {
                navigate(`/${newChatId}`);
              },
            },
          );
          // addDialogue(newChatId, message) //
          //   .then((res) => {
          //     navigate(`/${newChatId}`);
          //   });
        });
    }
  };

  // 추가하기 버튼 클릭할 때
  useEffect(() => {
    setModel(MODEL_INIT);
    setMessage(PROMPT_INIT);
  }, [click]);

  // 모델 선택 값
  useEffect(() => {
    if (chatQuery) {
      setModel(chatQuery.chat_model_id);
      setDialogues(chatQuery.dialogues);
    }
  }, [chatQuery]);

  // 채팅방 이동시, 프롬프트 초기화
  useEffect(() => {
    if (!chatId) {
      setDialogues(DIALOGUES_INIT);
    }

    setMessage(PROMPT_INIT);
  }, [chatId]);

  return (
    <div>
      <h2>ChatDetail</h2>

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
      {dialogueIsPending && <p>"{message}"에 대한 답변을 생성중입니다.</p>}

      <form action="">
        <Textarea
          name=""
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
