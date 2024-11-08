import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

import styles from './logo.module.css';

interface LogoPropsType {
  onClick?: () => void;
}

const cx = classNames.bind(styles);

const Logo = ({ onClick }: LogoPropsType) => {
  const navigate = useNavigate();

  return (
    <h1
      className={cx('logo')}
      onClick={() => {
        // 홈으로 이동
        navigate('/');

        if (!onClick) return;
        onClick();
      }}
    >
      Nota Chat
      <IoChatboxEllipsesOutline className={cx('icon')} aria-hidden />
    </h1>
  );
};

export default Logo;
