import { HTMLAttributes } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useChatData from '@/hooks/useChatData';
import { useChatStore } from '@/store/chat';
import { MODEL_ID_INIT, MODEL_ID_NEW } from '../../constants';

import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import ModelSelect from './ModelSelect';
import Dialoguelist from './DialogList';
import useChatId from '@/hooks/useChatId';

type SectionPropsType = HTMLAttributes<HTMLDivElement>;

const ChatBoxSection = ({ ...props }: SectionPropsType) => {
  const navigate = useNavigate();
  const { chatId } = useChatId();
  const { click } = useChatStore();
  const {
    model,
    message,
    dialogues,
    modelsQuery,
    chatIsLoading,
    modelsQueryIsLoading,
    addNewDialogue,
    setModel,
    setMessage,
    mutationDialogue,
  } = useChatData(chatId);

  // 추가하기 버튼 클릭할 때
  useEffect(() => {
    setModel(MODEL_ID_NEW);
  }, [click]);

  // 페이지 마운트
  useEffect(() => {
    setModel(MODEL_ID_INIT);
  }, []);

  return (
    <section {...props}>
      <h2>ChatBox</h2>

      {modelsQueryIsLoading && <p>모델 리스트를 호출중입니다.</p>}
      {modelsQuery && (
        <ModelSelect
          modelList={modelsQuery}
          modelId={model}
          onSelectChange={(selectedModelId) => {
            navigate('/');
            setModel(selectedModelId);
          }}
        />
      )}

      {chatIsLoading && <p>대화 내역을 호출중입니다.</p>}
      {dialogues && <Dialoguelist dialogueList={dialogues} />}
      {mutationDialogue.isPending && <p>"{message}"에 대한 답변을 생성중입니다.</p>}

      <Textarea
        value={message}
        onTextInput={(message) => {
          setMessage(message);
        }}
        disabled={!model}
        placeholder="메세지를 입력하세요"
      />

      <Button
        type="button"
        onClick={addNewDialogue}
        disabled={!model || mutationDialogue.isPending}
      >
        {mutationDialogue.isPending ? '답변 생성중...' : '프롬프트 보내기'}
      </Button>
    </section>
  );
};

export default ChatBoxSection;
