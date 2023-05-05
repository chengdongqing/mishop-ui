import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './index.module.less';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gray?: boolean;
}

export default function Button({ gray, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(styles.btn, gray && styles.btn_gray, className)}
    />
  );
}
