import classNames from 'classnames/bind';
import { AiOutlineLoading } from 'react-icons/ai';

import styles from './loading.module.css';

interface EmptyPropsType {
  text: string;
  className?: string;
  color?: 'red' | 'blue' | 'gray';
}

const cx = classNames.bind(styles);

const Loading = ({ text, className, color = 'gray' }: EmptyPropsType) => {
  return (
    <p className={cx('loading', color, className)}>
      <AiOutlineLoading className={cx('spinner')} aria-hidden />
      {text}
    </p>
  );
};

export default Loading;
