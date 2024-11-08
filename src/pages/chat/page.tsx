import classNames from 'classnames/bind';
import { useShallow } from 'zustand/shallow';
import { useChatStore } from '@/store/chat';

import ChatListSection from './components/ChatListSection';
import ChatBoxSection from './components/ChatBoxSection';
import Container from '@/components/layout/Container';

import styles from './page.module.css';

const cx = classNames.bind(styles);

const Chat = () => {
  const { chatId } = useChatStore(useShallow((state) => state));

  return (
    <Container className={cx('container')}>
      <ChatListSection chatId={chatId} className={cx('box', 'list-section')} />
      <ChatBoxSection chatId={chatId} className={cx('box', 'box-section')} />
    </Container>
  );
};

export default Chat;
