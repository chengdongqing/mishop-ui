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
  const [checked, setChecked, formItemCtx] = useFormItem(
    props.checked,
    props.defaultChecked || false,
    props.onChange
  );

  const groupCtx = useContext(CheckboxContext);
  const disabled = props.disabled || groupCtx.disabled || formItemCtx.disabled;

  useEffect(() => {
    if (props.value && Array.isArray(groupCtx.values)) {
      setChecked(groupCtx.values.includes(props.value));
    }
  }, [groupCtx.values, props.value, setChecked]);

  function handleChange() {
    if (disabled) return;

    const newChecked = !checked;
    setChecked(newChecked);
    if (newChecked) {
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
        (checked || props.indeterminate) && styles.active
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
  values?: BasicValue[];
  disabled?: boolean;
  onChecked?(value: BasicValue): void;
  onUnchecked?(value: BasicValue): void;
}

const CheckboxContext = createContext<CheckboxContextProps>({});

interface CheckboxGroupProps extends PropsWithChildren {
  value?: BasicValue[];
  defaultValue?: BasicValue[];
  disabled?: boolean;
  onChange?(checkedValue?: BasicValue[]): void;
}

function CheckboxGroup({
  value: propValue,
  defaultValue,
  disabled = false,
  children,
  onChange
}: CheckboxGroupProps) {
  const [values, setValues, ctx] = useFormItem(
    propValue,
    defaultValue,
    onChange
  );

  function onChecked(value: BasicValue) {
    if (!values?.includes(value)) {
      setValues([...(values || []), value]);
    }
  }
  function onUnchecked(value1: BasicValue) {
    if (values?.includes(value1)) {
      const index = values.findIndex((item) => Object.is(item, value1));
      values.splice(index, 1);
      setValues([...values]);
    }
  }

  return (
    <CheckboxContext.Provider
      value={{
        values,
        disabled: disabled || ctx.disabled,
        onChecked,
        onUnchecked
      }}
    >
      <FormItemContext.Provider value={{}}>{children}</FormItemContext.Provider>
    </CheckboxContext.Provider>
  );
}

Checkbox.Group = CheckboxGroup;

export default Checkbox;
