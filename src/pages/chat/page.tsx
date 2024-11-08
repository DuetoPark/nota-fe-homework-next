import classNames from 'classnames/bind';

import ChatListSection from './components/ChatListSection';
import ChatBoxSection from './components/ChatBoxSection';
import Container from '@/components/layout/Container';

import styles from './page.module.css';
import { useParams } from 'react-router-dom';
import { CHAT_ID_INIT } from './constants';

const cx = classNames.bind(styles);

const Chat = () => {
  const { chatId } = useParams();

  return (
    <Container className={cx('container')}>
      <ChatListSection chatId={chatId ?? CHAT_ID_INIT} className={cx('box', 'list-section')} />
      <ChatBoxSection chatId={chatId ?? CHAT_ID_INIT} className={cx('box', 'box-section')} />
    </Container>
  );
};

export default Chat;
