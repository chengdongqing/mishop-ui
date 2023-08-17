import useFormItem from '@/hooks/useFormItem.ts';
import classNames from 'classnames';
import { createContext, PropsWithChildren, useContext } from 'react';
import styles from './index.module.css';

interface RadioGroupContextProps {
  value?: BasicValue;
  disabled?: boolean;
  onChange(value: BasicValue): void;
}

const RadioGroupContext = createContext<RadioGroupContextProps | null>(null);

interface RadioProps extends PropsWithChildren {
  value?: BasicValue;
  disabled?: boolean;
}

export default function Radio({ children, value, disabled }: RadioProps) {
  const ctx = useContext(RadioGroupContext);
  const finalDisabled = disabled || ctx?.disabled;

  return (
    <div
      className={classNames(
        styles.radio_item,
        ctx?.value === value && styles.active,
        finalDisabled && styles.disabled
      )}
      onClick={() => {
        if (!finalDisabled) {
          ctx?.onChange(value);
        }
      }}
    >
      <div className={styles.icon} />
      <div className={styles.label}>{children}</div>
    </div>
  );
}

interface RadioGroupProps extends PropsWithChildren {
  value?: BasicValue;
  defaultValue?: BasicValue;
  disabled?: boolean;

  onChange?(value: BasicValue): void;
}

Radio.Group = function RadioGroup(props: RadioGroupProps) {
  const [value, setValue] = useFormItem(
    props.value,
    props.defaultValue,
    props.onChange
  );

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        disabled: props.disabled,
        onChange: setValue
      }}
    >
      <div className={styles.radio_group}>{props.children}</div>
    </RadioGroupContext.Provider>
  );
};
