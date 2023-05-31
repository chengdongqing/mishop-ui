import Dropdown, { OptionProps } from '@/components/Dropdown';
import { FormItemContext } from '@/components/Form/FormItem.tsx';
import Input from '@/components/Input';
import useLatest from '@/hooks/useLatest.ts';
import { DownOutlined } from '@ant-design/icons';
import { Key, useContext, useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';

interface SelectProps {
  options: OptionProps[];
  defaultValue?: Key;
  onChange?(value: Key): void;
}

export default function Select({
  options,
  defaultValue,
  onChange
}: SelectProps) {
  const formItemCtx = useContext(FormItemContext);
  const [value, setValue] = useState(defaultValue);
  const valueRef = useLatest(value);

  useEffect(() => {
    if (formItemCtx.initialValue) {
      setValue(formItemCtx.initialValue as Key);
    }
    formItemCtx.registerField?.({
      getValue() {
        return valueRef.current;
      },
      setValue(val) {
        setValue(val as Key);
      }
    });
  }, [formItemCtx.initialValue]);

  const current = useMemo(() => {
    return options.find((item) => item.key === value)?.label as string;
  }, [options, value]);

  return (
    <div className={styles.select}>
      <Dropdown
        menus={options}
        active={value}
        arrow={false}
        trigger={'click'}
        overlayClassName={styles.overlay}
        onChange={(key) => {
          setValue(key);
          onChange?.(key);
          formItemCtx.onChange?.(key);
        }}
      >
        <FormItemContext.Provider value={{}}>
          <Input
            readonly
            value={current}
            style={{ width: '100%' }}
            className={styles.input}
            suffix={
              <DownOutlined
                style={{
                  color: 'rgba(0,0,0,0.25)',
                  fontSize: '1.6rem',
                  marginRight: '1.6rem'
                }}
              />
            }
          />
        </FormItemContext.Provider>
      </Dropdown>
    </div>
  );
}
