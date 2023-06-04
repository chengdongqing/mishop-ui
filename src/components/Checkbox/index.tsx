import { FormItemContext } from '@/components/Form/FormItem.tsx';
import Iconfont from '@/components/Iconfont';
import Space from '@/components/Space';
import useFormItem from '@/hooks/useFormItem.ts';
import classNames from 'classnames';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import styles from './index.module.less';

interface CheckboxProps extends PropsWithChildren {
  value?: BasicValue;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?(checked: boolean): void;
}

function Checkbox(props: CheckboxProps) {
  const { finalValue, valueRef, formItemCtx, update } = useFormItem(
    props.checked,
    props.defaultChecked || false
  );

  const groupCtx = useContext(CheckboxContext);
  const disabled = props.disabled || groupCtx.disabled;

  useEffect(() => {
    if (props.value && Array.isArray(groupCtx.value)) {
      valueRef.current = groupCtx.value.includes(props.value);
      update();
    }
  }, [groupCtx.value, props.value, update, valueRef]);

  function handleChange() {
    if (disabled) return;

    const checked = !finalValue;
    formItemCtx.onChange?.(checked);
    valueRef.current = checked;
    props.onChange?.(checked);
    update();
    if (checked) {
      groupCtx.onChecked?.(props.value);
    } else {
      groupCtx.onUnchecked?.(props.value);
    }
  }

  return (
    <Space
      className={classNames(
        styles.container,
        !!disabled && styles.disabled,
        (finalValue || props.indeterminate) && styles.active
      )}
      onClick={handleChange}
    >
      <div className={styles.checkbox}>
        <Iconfont type={props.indeterminate ? 'i-minus' : 'i-check'} />
      </div>
      <div className={styles.label}>{props.children}</div>
    </Space>
  );
}

interface CheckboxContextProps {
  value?: BasicValue[];
  disabled?: boolean;
  onChecked?(value: BasicValue): void;
  onUnchecked?(value: BasicValue): void;
}

const CheckboxContext = createContext<CheckboxContextProps>({});

interface CheckboxGroupProps extends PropsWithChildren {
  value?: BasicValue[];
  defaultValue?: BasicValue[];
  disabled?: boolean;
  onChange?(checkedValue: BasicValue[]): void;
}

function CheckboxGroup({
  value,
  defaultValue,
  disabled = false,
  children,
  onChange
}: CheckboxGroupProps) {
  const { finalValue, valueRef, formItemCtx, update } = useFormItem(
    value,
    defaultValue
  );

  function onChecked(value1: BasicValue) {
    if (!finalValue?.includes(value1)) {
      const newValue = [...(finalValue || []), value1];
      formItemCtx.onChange?.(newValue);
      valueRef.current = newValue;
      onChange?.(newValue);
      update();
    }
  }
  function onUnchecked(value1: BasicValue) {
    if (finalValue?.includes(value1)) {
      const index = finalValue.findIndex((item) => Object.is(item, value1));
      finalValue.splice(index, 1);
      const newValue = [...finalValue];
      formItemCtx.onChange?.(newValue);
      valueRef.current = newValue;
      onChange?.(newValue);
      update();
    }
  }

  return (
    <CheckboxContext.Provider
      value={{ value: finalValue, disabled, onChecked, onUnchecked }}
    >
      <FormItemContext.Provider value={{}}>{children}</FormItemContext.Provider>
    </CheckboxContext.Provider>
  );
}

Checkbox.Group = CheckboxGroup;

export default Checkbox;
