import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiViewList } from 'react-icons/ci';
import classNames from 'classnames/bind';
import useChatsQuery from '@/hooks/queries/useChatsQuery';
import { useChatStore } from '@/store/chat';

import Loading from '@/components/query/Loading';
import AddChatButton from './AddChatButton';
import ChatList from './ChatList';

import styles from './chatListSection.module.css';

interface SectionPropsType extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const cx = classNames.bind(styles);

const ChatListSection = ({ className, ...props }: SectionPropsType) => {
  const navigate = useNavigate();
  const { setClick } = useChatStore();
  const { isLoading, data: chatsQuery } = useChatsQuery();

  return (
    <section className={cx('section', className)} {...props}>
      <header className={cx('header')}>
        <h2 className={cx('title')}>
          <CiViewList aria-hidden />
          채팅 목록
        </h2>

        <AddChatButton
          className=""
          onClick={() => {
            navigate('/');
            setClick();
          }}
        />
      </header>

      <div className={cx('content')}>
        {isLoading && <Loading text="채팅 리스트을(를) 불러오는 중입니다." />}
        {chatsQuery && (
          <ChatList
            chatList={chatsQuery}
            onClick={(currentId) => {
              navigate(`/${currentId}`);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ChatListSection;
