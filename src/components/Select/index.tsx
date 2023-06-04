import Dropdown, { OptionProps } from '@/components/Dropdown';
import { FormItemContext } from '@/components/Form/FormItem.tsx';
import Input from '@/components/Input';
import useFormItem from '@/hooks/useFormItem.ts';
import { DownOutlined } from '@ant-design/icons';
import { Key, useMemo } from 'react';
import styles from './index.module.less';

interface SelectProps {
  value?: Key;
  defaultValue?: Key;
  options: OptionProps[];
  placeholder?: string;
  onChange?(value: Key): void;
}

export default function Select({
  value,
  defaultValue,
  options,
  placeholder,
  onChange
}: SelectProps) {
  const { finalValue, valueRef, formItemCtx, update } = useFormItem(
    value,
    defaultValue
  );
  const current = useMemo(() => {
    return options.find((item) => item.key === finalValue)?.label as string;
  }, [options, finalValue]);

  return (
    <div className={styles.select}>
      <Dropdown
        menus={options}
        active={value}
        arrow={false}
        trigger={'click'}
        overlayClassName={styles.overlay}
        onChange={(val) => {
          formItemCtx.onChange?.(val);
          valueRef.current = val;
          onChange?.(val);
          update();
        }}
      >
        <FormItemContext.Provider value={{}}>
          <Input
            readonly
            value={current}
            error={formItemCtx.error}
            placeholder={placeholder}
            style={{ width: '100%' }}
            className={styles.input}
            suffix={
              <DownOutlined
                style={{
                  color: 'rgba(0,0,0,0.25)',
                  marginRight: '1.6rem',
                  fontSize: '1.6rem'
                }}
              />
            }
          />
        </FormItemContext.Provider>
      </Dropdown>
    </div>
  );
}
