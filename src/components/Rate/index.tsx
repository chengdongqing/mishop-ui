import Space from '@/components/Space';
import useFormItem from '@/hooks/useFormItem.ts';
import { StarFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './index.module.less';

interface RateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  disabled?: boolean;
  character?: ReactNode | ((value: number) => ReactNode);
  prefix?: ReactNode;
  suffix?: ReactNode;

  onChange?(value: number): void;
}

export default function Rate({
  value: propValue,
  defaultValue = 5,
  count = 5,
  disabled,
  character = <StarFilled />,
  prefix,
  suffix,
  onChange
}: RateProps) {
  const [value, setValue] = useFormItem(propValue, defaultValue, onChange);

  return (
    <Space>
      {!!prefix && <div className={styles.prefix}>{prefix}</div>}
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
                  setValue(index + 1);
                }
              }}
            >
              {typeof character === 'function' ? character(value) : character}
            </div>
          ))}
      </Space>
      {!!suffix && <div className={styles.suffix}>{suffix}</div>}
    </Space>
  );
}
