import Space from '@/components/Space';
import { StarFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';
import styles from './index.module.less';

interface RateProps extends PropsWithChildren {
  count?: number;
  value?: number;
  disabled?: boolean;
  character?: ReactNode | ((value: number) => ReactNode);
  onChange?(value: number): void;
}

export default function Rate({
  count = 5,
  value = 5,
  disabled,
  character = <StarFilled />,
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
              {typeof character === 'function' ? character(value) : character}
            </div>
          ))}
      </Space>
      {!!children && <div className={styles.label}>{children}</div>}
    </Space>
  );
}
