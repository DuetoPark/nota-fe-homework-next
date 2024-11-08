import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import ScrollToBottom from 'react-scroll-to-bottom';
import useChatData from '@/hooks/useChatData';
import { useChatStore } from '@/store/chat';
import { sliceText } from '@/utils/format';
import { DIALOGUES_INIT, MODEL_ID_INIT, MODEL_ID_NEW, PROMPT_INIT } from '../../constants';

import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import Loading from '@/components/query/Loading';
import ModelSelect from './ModelSelect';
import Dialoguelist from './DialogueList';

import styles from './chatBoxSection.module.css';

interface SectionPropsType {
  className?: string;
  chatId: string;
}

const cx = classNames.bind(styles);

const ChatBoxSection = ({ className, chatId }: SectionPropsType) => {
  const navigate = useNavigate();
  const { click, setChatId } = useChatStore();
  const {
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
  } = useChatData(chatId);

  // 모델 ID 초기화 및 설정
  useEffect(() => {
    setModel(click ? MODEL_ID_NEW : MODEL_ID_INIT);
  }, [click]);

  // NOTE: 채팅 데이터와 모델 정보 로드
  useEffect(() => {
    if (!chatQuery) return;

    setModel(chatQuery.chat_model_id);
    setDialogues(chatQuery.dialogues);
  }, [chatQuery]);

  // NOTE: 모델과 메세지 리셋
  useEffect(() => {
    // 새 채팅
    if (!chatId) {
      setDialogues(DIALOGUES_INIT);
    }

    setMessage(PROMPT_INIT);
  }, [model, chatId]);

  return (
    <section className={cx('section', className)}>
      <header className={cx('header')}>
        <h2 className="visually-hidden">채팅창</h2>

        {modelsQueryIsLoading && <Loading text="모델 리스트을(를) 불러오는 중입니다." />}
        {modelsQuery && (
          <ModelSelect
            modelList={modelsQuery}
            modelId={model}
            onSelectChange={(selectedModelId) => {
              navigate('/');
              setChatId('');
              setModel(selectedModelId);
            }}
          />
        )}
      </header>

      <ScrollToBottom className={cx('content')}>
        {chatIsLoading && <Loading text="대화 내역을(를) 불러오는 중입니다." />}
        {!chatIsLoading && dialogues && <Dialoguelist dialogueList={dialogues} />}
        {mutationDialogue.isPending && (
          <Loading color="blue" text={`${sliceText(message, 30)}에 대한 답변을 생성중입니다.`} />
        )}
      </ScrollToBottom>

      <footer className={cx('footer')}>
        <Textarea
          className={cx('textarea')}
          value={message}
          onTextInput={(message) => {
            setMessage(message);
          }}
          disabled={!model}
          placeholder="메세지를 입력하세요"
        />

        <Button
          type="button"
          className={cx('submit-button')}
          onClick={addNewDialogue}
          disabled={!model || mutationDialogue.isPending}
        >
          {mutationDialogue.isPending ? '답변 생성중...' : '프롬프트 보내기'}
        </Button>
      </footer>
    </section>
  );
};

export default ChatBoxSection;
