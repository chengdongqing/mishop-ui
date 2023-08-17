import Space from '@/components/Space';
import useFormItem from '@/hooks/useFormItem.ts';
import { StarFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import styles from './index.module.css';

interface RateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  disabled?: boolean;
  character?: ReactNode | ((value: number) => ReactNode);
  prefix?: ReactNode | ((value: number) => ReactNode);
  suffix?: ReactNode | ((value: number) => ReactNode);

  onChange?(value: number): void;
}

export default function Rate({
  value: propValue,
  defaultValue = 5,
  count = 5,
  disabled: propDisabled,
  character = <StarFilled />,
  prefix,
  suffix,
  onChange
}: RateProps) {
  const [value, setValue, ctx] = useFormItem(propValue, defaultValue, onChange);
  const disabled = propDisabled || ctx.disabled;
  const [currentValue, setCurrentValue] = useState<number>();
  const tempValue = currentValue || value;

  return (
    <Space>
      {!!prefix && (
        <div className={styles.prefix}>
          {typeof prefix === 'function' ? prefix(tempValue) : prefix}
        </div>
      )}
      <Space
        onMouseLeave={() => {
          if (!disabled) {
            setCurrentValue(undefined);
          }
        }}
      >
        {Array(count)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={classNames(
                styles.item,
                tempValue > index && styles.active,
                disabled && styles.disabled
              )}
              onMouseEnter={() => {
                if (!disabled) {
                  setCurrentValue(index + 1);
                }
              }}
              onClick={() => {
                if (!disabled) {
                  setValue(index + 1);
                }
              }}
            >
              {typeof character === 'function'
                ? character(tempValue)
                : character}
            </div>
          ))}
      </Space>
      {!!suffix && (
        <div className={styles.suffix}>
          {typeof suffix === 'function' ? suffix(tempValue) : suffix}
        </div>
      )}
    </Space>
  );
}
