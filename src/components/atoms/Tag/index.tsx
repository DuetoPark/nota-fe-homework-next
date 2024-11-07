import classNames from 'classnames/bind';

import styles from './tag.module.css';

interface TagPropsType {
  text: string;
  className?: string;
  color?: 'gray' | 'blue' | 'yellow' | 'red';
}

const cx = classNames.bind(styles);

const Tag = ({ text, className, color }: TagPropsType) => {
  return <strong className={cx('tag', color, className)}>{text}</strong>;
};

export default Tag;
