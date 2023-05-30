import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.less';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gray?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  size?: 'default' | 'small';
}

export default function Button({
  gray,
  size,
  outlined,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={classNames(
        className,
        styles.btn,
        gray && styles.gray,
        !!size && styles[size],
        outlined && styles.outlined,
        rest.disabled && styles.disabled
      )}
    />
  );
}
