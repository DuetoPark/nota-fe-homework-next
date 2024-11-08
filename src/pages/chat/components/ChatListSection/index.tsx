import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiViewList } from 'react-icons/ci';
import classNames from 'classnames/bind';
import useChatsQuery from '@/hooks/queries/useChatsQuery';
import { useChatStore } from '@/store/chat';

import Loading from '@/components/query/Loading';
import AddChatButton from './AddChatButton';
import ChatList from './ChatList';

import styles from './chatListSection.module.css';

interface SectionPropsType {
  className?: string;
  chatId: string;
}

const cx = classNames.bind(styles);

const ChatListSection = ({ className, chatId }: SectionPropsType) => {
  const navigate = useNavigate();
  const { setClick, setChatId } = useChatStore();
  const { isLoading, data: chatsQuery } = useChatsQuery();

  const movePageAndChangeChatId = useCallback((chatId: string) => {
    navigate(`/${chatId}`);
    setChatId(chatId);
  }, []);

  const newChatHandler = useCallback(() => {
    movePageAndChangeChatId('');
    setClick();
  }, []);

  return (
    <section className={cx('section', className)}>
      <header className={cx('header')}>
        <h2 className={cx('title')}>
          <CiViewList aria-hidden />
          채팅 목록
        </h2>

        <AddChatButton className="" onClick={() => newChatHandler()} />
      </header>

      <div className={cx('content')}>
        {isLoading && <Loading text="채팅 리스트을(를) 불러오는 중입니다." />}
        {chatsQuery && (
          <ChatList
            chatList={chatsQuery}
            chatId={chatId}
            onClick={(currentId) => movePageAndChangeChatId(currentId)}
          />
        )}
      </div>
    </section>
  );
};

export default ChatListSection;
