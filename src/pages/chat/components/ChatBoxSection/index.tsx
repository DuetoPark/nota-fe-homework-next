import { HTMLAttributes } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import ScrollToBottom from 'react-scroll-to-bottom';
import useChatData from '@/hooks/useChatData';
import { useChatStore } from '@/store/chat';
import useChatId from '@/hooks/useChatId';
import { MODEL_ID_INIT, MODEL_ID_NEW } from '../../constants';

import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import Loading from '@/components/query/Loading';
import ModelSelect from './ModelSelect';
import Dialoguelist from './DialogueList';

import styles from './chatBoxSection.module.css';

interface SectionPropsType extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const cx = classNames.bind(styles);

const ChatBoxSection = ({ className, ...props }: SectionPropsType) => {
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
    <section className={cx('section', className)} {...props}>
      <header className={cx('header')}>
        <h2 className="visually-hidden">채팅창</h2>

        {modelsQueryIsLoading && <Loading text="모델 리스트을(를) 불러오는 중입니다." />}
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
      </header>

      <ScrollToBottom className={cx('content')}>
        {chatIsLoading && <Loading text="대화 내역을(를) 불러오는 중입니다." />}
        {!chatIsLoading && dialogues && <Dialoguelist dialogueList={dialogues} />}
        {mutationDialogue.isPending && <Loading text={`${message}에 대한 답변을 생성중입니다.`} />}
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
