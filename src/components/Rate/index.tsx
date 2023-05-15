import Space from '@/components/Space';
import { StarFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import styles from './index.module.less';

interface RateProps extends PropsWithChildren {
  count?: number;
  value?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export default function Rate({
  count = 5,
  value = 5,
  disabled,
  children,
  onChange
}: RateProps) {
  return (
    <Space>
      <Space>
        {Array(count)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={classNames(
                styles.item,
                value > index && styles.active,
                disabled && styles.disabled
              )}
              onClick={() => {
                if (!disabled) {
                  onChange?.(index + 1);
                }
              }}
            >
              <StarFilled />
            </div>
          ))}
      </Space>
      {!!children && <div className={styles.label}>{children}</div>}
    </Space>
  );
}
