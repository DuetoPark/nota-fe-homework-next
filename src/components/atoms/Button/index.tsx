import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button as PrimitiveButton } from '@radix-ui/themes';
import classNames from 'classnames/bind';

import styles from './button.module.css';

const cx = classNames.bind(styles);

interface ButtonAttrProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  className?: string;
}

const Button = ({ className, disabled, onClick, children, ...props }: ButtonAttrProps) => {
  return (
    <PrimitiveButton
      className={cx('button', className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </PrimitiveButton>
  );
};

export default Button;
