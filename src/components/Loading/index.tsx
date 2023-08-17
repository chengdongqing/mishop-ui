import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './index.module.css';

export default function Loading({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames(styles.container, className)} {...rest}>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <span key={index} className={styles.icon} />
        ))}
    </div>
  );
}
