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
  value: propValue,
  defaultValue,
  options,
  placeholder,
  onChange
}: SelectProps) {
  const [value, setValue, ctx] = useFormItem(propValue, defaultValue, onChange);
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
        onChange={setValue}
      >
        <FormItemContext.Provider value={{}}>
          <Input
            readonly
            value={current}
            error={ctx.error}
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
