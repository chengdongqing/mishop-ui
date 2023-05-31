import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.less';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gray?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: 'default' | 'small';
}

export default function Button({
  gray,
  size,
  outlined,
  loading,
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={classNames(
        className,
        styles.btn,
        gray && styles.gray,
        !!size && styles[size],
        outlined && styles.outlined,
        (disabled || loading) && styles.disabled
      )}
    >
      {!!loading && <LoadingOutlined style={{ marginRight: '0.8rem' }} />}
      {children}
    </button>
  );
}
