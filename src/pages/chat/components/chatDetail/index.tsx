import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { addDialogue, createChat } from '@/apis/chat';
import useModelsQuery from '@/hooks/queries/useModelsQuery';
import useChatQuery from '@/hooks/queries/useChatQuery';
import { useChatStore } from '@/store/chat';
import { DIALOGUES_INIT, MODEL_INIT, PROMPT_INIT } from '../../constants';
import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import ModelSelect from './ModelSelect';
import Dialoguelist from './DialogList';

const ChatDetail = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const [dialogues, setDialogues] = useState<any[] | null>(DIALOGUES_INIT);
  const [model, setModel] = useState<string>(MODEL_INIT);
  const [message, setMessage] = useState<string>(PROMPT_INIT);
  const { setChatList, click } = useChatStore();

  const { isLoading: chatIsLoading, data: chatQuery } = useChatQuery(chatId ?? '');
  const { isLoading: modelsQueryIsLoading, data: modelsQuery } = useModelsQuery();

  // 대화 추가
  const addDialogue = () => {
    if (!message.trim()) return;

    if (!chatId) {
      createChat(model)
        .then((res) => res.at(-1))
        .then((data) => {
          // data === 새로 생성한 chat 정보
          addDialogue(data.chat_id, message)
            .then((res) => {
              const newDialog = res.dialogues.at(-1);
              setDialogues((prev) => {
                if (prev) return [...prev, newDialog];
                return [newDialog];
              });

              return res;
            })
            .then((data) => setChatList(data));

          return data;
        });

      return;
    }

    addDialogue(chatId, message).then((res) => {
      const newDialog = res.dialogues.at(-1);
      setDialogues((prev) => [...prev, { ...newDialog }]);
    });
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
    }
  }, [chatQuery]);

  // 채팅방 이동시, 프롬프트 초기화
  useEffect(() => {
    setMessage(PROMPT_INIT);
  }, [chatId]);

  return (
    <div>
      <h2>ChatDetail</h2>

      <p>params:{chatId}</p>
      <p>model id: {chatQuery?.chat_model_id}</p>
      <p>model value: {model}</p>

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
      {chatQuery && chatQuery?.dialogues && <Dialoguelist dialogueList={chatQuery?.dialogues} />}

      <form action="">
        <Textarea
          name=""
          onTextInput={(message) => {
            setMessage(message);
          }}
          disabled={!model}
          placeholder="메세지를 입력하세요"
        />

        <Button type="button" onClick={addDialogue} disabled={!model}>
          프롬프트 보내기
        </Button>
      </form>
    </div>
  );
};

export default ChatDetail;
