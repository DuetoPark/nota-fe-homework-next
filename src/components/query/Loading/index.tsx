import classNames from 'classnames/bind';
import { AiOutlineLoading } from 'react-icons/ai';

import styles from './loading.module.css';

interface EmptyPropsType {
  text: string;
  className?: string;
}

const cx = classNames.bind(styles);

const Loading = ({ text, className }: EmptyPropsType) => {
  return (
    <p className={cx('loading', className)}>
      <AiOutlineLoading className={cx('spinner')} aria-hidden />
      {text}
    </p>
  );
};

export default Loading;
