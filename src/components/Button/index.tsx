import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.less';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gray?: boolean;
  outlined?: boolean;
  size?: 'default' | 'small';
}

export default function Button({
  gray,
  outlined,
  size = 'default',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        className,
        styles.btn,
        styles[size],
        gray && styles.gray,
        outlined && styles.outlined
      )}
    />
  );
}
