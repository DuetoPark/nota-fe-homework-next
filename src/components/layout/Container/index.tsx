import { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './container.module.css';

const cx = classNames.bind(styles);

interface ContainerPropsType extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className, ...props }: ContainerPropsType) => {
  return (
    <div className={cx('container', className)} {...props}>
      {children}
    </div>
  );
};

export default Container;
