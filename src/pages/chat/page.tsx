import classNames from 'classnames/bind';

import ChatListSection from './components/ChatListSection';
import ChatBoxSection from './components/ChatBoxSection';
import Container from '@/components/layout/Container';

import styles from './page.module.css';

const cx = classNames.bind(styles);

const Chat = () => {
  return (
    <Container className={cx('container')}>
      <ChatListSection className={cx('box', 'list-section')} />
      <ChatBoxSection className={cx('box', 'box-section')} />
    </Container>
  );
};

export default Chat;
