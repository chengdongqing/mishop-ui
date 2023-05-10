import Iconfont from '@/components/Iconfont';
import Space from '@/components/Space';
import classNames from 'classnames';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';

interface CheckboxProps extends PropsWithChildren {
  value?: BasicValue;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
  const context = useContext(GroupContext);
  const [checked, setChecked] = useState(false);

  const disabled = useMemo(() => {
    return props.disabled || context?.disabled;
  }, [context?.disabled, props.disabled]);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    } else if (props.value && Array.isArray(context?.value)) {
      setChecked(!!context?.value.includes(props.value));
    }
  }, [context?.value, props.checked, props.value]);

  function handleChange() {
    if (disabled) return;

    const checked1 = !checked;
    props.onChange?.(checked1);
    if (checked1) {
      context?.registerValue(props.value);
    } else {
      context?.cancelValue(props.value);
    }
  }

  return (
    <Space
      className={classNames(
        styles.container,
        checked && styles.active,
        !!disabled && styles.disabled
      )}
      onClick={handleChange}
    >
      <div className={styles.checkbox}>
        <Iconfont type={'i-check'} />
      </div>
      <div className={styles.label}>{props.children}</div>
    </Space>
  );
}

interface CheckboxGroupContextProps {
  value?: BasicValue[];
  disabled?: boolean;
  registerValue: (value: BasicValue) => void;
  cancelValue: (value: BasicValue) => void;
}

const GroupContext = createContext<CheckboxGroupContextProps | null>(null);

interface CheckboxGroupProps extends PropsWithChildren {
  value?: BasicValue[];
  disabled?: boolean;
  onChange?: (checkedValue: BasicValue[]) => void;
}

function CheckboxGroup({
  children,
  value,
  disabled = false,
  onChange
}: CheckboxGroupProps) {
  const [checkedValue, setCheckedValue] = useState<BasicValue[]>([]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setCheckedValue(value);
    }
  }, [value]);

  function registerValue(value1: BasicValue) {
    if (!checkedValue?.includes(value1)) {
      const newValue = [...(checkedValue || []), value1];
      setCheckedValue(newValue);
      onChange?.(newValue);
    }
  }
  function cancelValue(value1: BasicValue) {
    if (checkedValue?.includes(value1)) {
      const index = checkedValue.findIndex((item) => Object.is(item, value1));
      checkedValue.splice(index, 1);
      const newValue = [...checkedValue];
      setCheckedValue(newValue);
      onChange?.(newValue);
    }
  }

  return (
    <GroupContext.Provider
      value={{ value: checkedValue, disabled, registerValue, cancelValue }}
    >
      {children}
    </GroupContext.Provider>
  );
}

Checkbox.Group = CheckboxGroup;

export default Checkbox;
