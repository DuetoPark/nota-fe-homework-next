import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { FaGithub } from 'react-icons/fa';

import Container from '../Container';
import styles from './gnb.module.css';
import { Box } from '@radix-ui/themes';

const cx = classNames.bind(styles);

const Gnb = () => {
  return (
    <header className={cx('gnb')}>
      <Container className={cx('container')}>
        <h1 className={cx('logo')}>
          <Link to="/">
            Nota Chat
            <IoChatboxEllipsesOutline className={cx('icon')} aria-hidden />
          </Link>
        </h1>

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
