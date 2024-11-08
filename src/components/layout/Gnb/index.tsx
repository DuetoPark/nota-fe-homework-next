import classNames from 'classnames/bind';
import { useShallow } from 'zustand/shallow';
import { useChatStore } from '@/store/chat';
import { CHAT_ID_INIT } from '@/pages/chat/constants';

import { Box } from '@radix-ui/themes';
import { FaGithub } from 'react-icons/fa';
import Container from '../Container';
import Logo from '../Logo';

import styles from './gnb.module.css';

const cx = classNames.bind(styles);

const Gnb = () => {
  const { setChatId } = useChatStore(useShallow((state) => state));

  return (
    <header className={cx('gnb')}>
      <Container className={cx('container')}>
        <Logo
          onClick={() => {
            setChatId(CHAT_ID_INIT);
          }}
        />

        <Box className={cx('link-box')}>
          <a
            className={cx('github')}
            href="https://github.com/DuetoPark/nota-fe-homework-react"
            target="_blank"
            aria-label="github"
          >
            <FaGithub className={cx('icon')} aria-hidden />
          </a>
        </Box>
      </Container>
    </header>
  );
};

export default Gnb;
