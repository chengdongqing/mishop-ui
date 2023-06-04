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
  value,
  defaultValue = 5,
  count = 5,
  disabled,
  character = <StarFilled />,
  prefix,
  suffix,
  onChange
}: RateProps) {
  const { finalValue, valueRef, formItemCtx, update } = useFormItem(
    value,
    defaultValue
  );

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
                finalValue > index && styles.active,
                disabled && styles.disabled
              )}
              onClick={() => {
                if (!disabled) {
                  const val = index + 1;
                  formItemCtx.onChange?.(val);
                  valueRef.current = val;
                  onChange?.(val);
                  update();
                }
              }}
            >
              {typeof character === 'function'
                ? character(finalValue)
                : character}
            </div>
          ))}
      </Space>
      {!!suffix && <div className={styles.suffix}>{suffix}</div>}
    </Space>
  );
}
