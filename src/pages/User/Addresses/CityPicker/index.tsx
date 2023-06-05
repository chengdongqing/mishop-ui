import Input from '@/components/Input';
import Space from '@/components/Space';
import useFormItem from '@/hooks/useFormItem.ts';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import cities from './cities.ts';
import styles from './index.module.less';

export interface City {
  name: string;
  code: string;
  children?: City[];
}

interface CityPickerProps {
  value?: City[];
  defaultValue?: City[];
  placeholder?: string;
  onChange?(values: City[]): void;
}

export default function CityPicker({
  value: propValue,
  defaultValue = [],
  placeholder,
  onChange
}: CityPickerProps) {
  const [value, setValue, ctx] = useFormItem(propValue, defaultValue, onChange);
  const [open, setOpen] = useState(false);

  const tips = useMemo(() => {
    return ['省份/自治区', '城市/地区', '区县'][value.length];
  }, [value.length]);
  const options = useMemo(() => {
    function findOptions(values: City[], depth: number): City[] {
      if (!value.length) return values;
      const options = values.find((item) => {
        return item.code === value[depth]?.code;
      })?.children;
      if (options?.length && depth < value.length - 1) {
        return findOptions(options, depth + 1);
      }
      if (!options) {
        setOpen(false);
        ctx.checkValue?.(value);
      }
      return options || values;
    }
    return findOptions(cities, 0);
  }, [value]);

  return (
    <div>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        <Input
          readonly
          placeholder={placeholder}
          value={value?.map((item) => item.name).join(' ')}
        />
      </div>

      <div
        className={classNames(styles.picker, open && styles.open)}
        hidden={!open}
      >
        <div className={styles.header}>
          <Space>
            {value.map((item, index) => (
              <span
                key={item.code}
                className={styles.active}
                onClick={() => {
                  setValue((items) => {
                    items.splice(index, value.length - index);
                    return [...items];
                  });
                }}
              >
                {item.name}
              </span>
            ))}
            {!!tips && <span>选择{tips}</span>}
          </Space>
        </div>
        <div className={styles.options}>
          <Space wrap size={'1.4rem'}>
            {options?.map((item) => (
              <div
                key={item.code}
                className={styles.item}
                onClick={() => {
                  setValue((items) => {
                    const option = {
                      name: item.name,
                      code: item.code
                    };
                    if (!tips) {
                      items.splice(items.length - 1, 1, option);
                      return [...items];
                    }
                    return [...items, option];
                  });
                }}
              >
                {item.name}
              </div>
            ))}
          </Space>
        </div>
      </div>
    </div>
  );
}
