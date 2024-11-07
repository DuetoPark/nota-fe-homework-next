import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './empty.module.css';

interface EmptyPropsType {
  children: ReactNode;
  className?: string;
}

const cx = classNames.bind(styles);

const Empty = ({ children, className }: EmptyPropsType) => {
  return <div className={cx('empty', className)}>{children}</div>;
};

export default Empty;
