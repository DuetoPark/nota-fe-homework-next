import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './avatar.module.css';

interface AvatarPropsType {
  children: ReactNode;
  className?: string;
}

const cx = classNames.bind(styles);

const Avatar = ({ children, className }: AvatarPropsType) => {
  return <div className={cx('avatar', className)}>{children}</div>;
};

export default Avatar;
