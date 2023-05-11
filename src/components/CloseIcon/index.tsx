import Iconfont from '@/components/Iconfont';
import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import styles from './index.module.less';

export default function CloseIcon({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={classNames(styles.container, className)}>
      <Iconfont type={'i-close'} />
    </div>
  );
}
