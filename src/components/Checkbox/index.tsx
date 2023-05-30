import { FormItemContext } from '@/components/Form/FormItem.tsx';
import Iconfont from '@/components/Iconfont';
import Space from '@/components/Space';
import useLatest from '@/hooks/useLatest.ts';
import classNames from 'classnames';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';

interface CheckboxProps extends PropsWithChildren {
  value?: BasicValue;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?(checked: boolean): void;
}

function Checkbox(props: CheckboxProps) {
  const ctx = useContext(CheckboxContext);
  const [checked, setChecked] = useState(false);
  const disabled = useMemo(() => {
    return props.disabled || ctx.disabled;
  }, [ctx.disabled, props.disabled]);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    } else if (props.value && Array.isArray(ctx.value)) {
      setChecked(ctx.value.includes(props.value));
    }
  }, [ctx.value, props.checked, props.value]);

  function handleChange() {
    if (disabled) return;

    const checked1 = !checked;
    props.onChange?.(checked1);
    if (checked1) {
      ctx.onChecked?.(props.value);
    } else {
      ctx.onUnchecked?.(props.value);
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
  value?: BasicValue[];
  disabled?: boolean;
  onChecked?(value: BasicValue): void;
  onUnchecked?(value: BasicValue): void;
}

const CheckboxContext = createContext<CheckboxContextProps>({});

interface CheckboxGroupProps extends PropsWithChildren {
  value?: BasicValue[];
  disabled?: boolean;
  onChange?(checkedValue: BasicValue[]): void;
}

function CheckboxGroup({
  children,
  value,
  disabled = false,
  onChange
}: CheckboxGroupProps) {
  const formItemCtx = useContext(FormItemContext);
  const [checkedValue, setCheckedValue] = useState<BasicValue[]>([]);

  const valueRef = useLatest(checkedValue);
  useEffect(() => {
    if (Array.isArray(formItemCtx.initialValue)) {
      setCheckedValue(formItemCtx.initialValue);
    }
    formItemCtx.registerField?.({
      getValue() {
        return valueRef.current;
      },
      setValue(val) {
        setCheckedValue(Array.isArray(val) ? val : []);
      }
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(value)) {
      setCheckedValue(value);
    }
  }, [value]);

  function onChecked(value1: BasicValue) {
    if (!checkedValue?.includes(value1)) {
      const newValue = [...(checkedValue || []), value1];
      setCheckedValue(newValue);
      onChange?.(newValue);
      formItemCtx.onChange?.(newValue);
    }
  }
  function onUnchecked(value1: BasicValue) {
    if (checkedValue?.includes(value1)) {
      const index = checkedValue.findIndex((item) => Object.is(item, value1));
      checkedValue.splice(index, 1);
      const newValue = [...checkedValue];
      setCheckedValue(newValue);
      onChange?.(newValue);
      formItemCtx.onChange?.(newValue);
    }
  }

  return (
    <CheckboxContext.Provider
      value={{ value: checkedValue, disabled, onChecked, onUnchecked }}
    >
      {children}
    </CheckboxContext.Provider>
  );
}

Checkbox.Group = CheckboxGroup;

export default Checkbox;
