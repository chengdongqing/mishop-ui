import Iconfont from '@/components/Iconfont';
import Space from '@/components/Space';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './index.module.less';

export default function Checkbox({
  checked = true,
  children,
  onChange
}: PropsWithChildren<{
  checked: boolean;
  onChange?: (value: boolean) => void;
}>) {
  return (
    <Space
      className={styles.container}
      onClick={() => {
        onChange?.(!checked);
      }}
    >
      <div className={classNames(styles.checkbox, checked && styles.active)}>
        <Iconfont type={'i-check'} className={styles.icon} />
      </div>
      <div className={styles.label}>{children}</div>
    </Space>
  );
}
