import { FormItemContext } from '@/components/Form/FormItem.tsx';
import { EyeClose, EyeOpen } from '@/components/Iconfont';
import Row from '@/components/Row';
import useLatest from '@/hooks/useLatest.ts';
import useToggle from '@/hooks/useToggle.ts';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { PropsWithStyle } from '@/utils/typings';
import classNames from 'classnames';
import { ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.less';

interface InputProps extends PropsWithStyle {
  defaultValue?: string | number;
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;

  onChange?(value: string): void;
}

export default function Input({
  defaultValue,
  value,
  placeholder,
  type,
  error,
  disabled,
  readonly,
  prefix,
  suffix,
  style,
  className,
  onChange
}: InputProps) {
  const formItemCtx = useContext(FormItemContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [showPwd, toggleShowPwd] = useToggle();
  const isPwdType = useMemo(() => type === 'password', [type]);

  const [value1, setValue1] = useState(value || defaultValue);
  const valueRef = useLatest(value1);
  useEffect(() => {
    if (!valueRef.current && formItemCtx.initialValue) {
      const val = formItemCtx.initialValue as string;
      (inputRef.current as HTMLInputElement).value = val;
      valueRef.current = val;
    }
    formItemCtx.registerField?.({
      getValue() {
        return valueRef.current;
      },
      setValue(val) {
        const val1 = (val as string) || '';
        (inputRef.current as HTMLInputElement).value = val1;
        setValue1(val1);
      }
    });
  }, [formItemCtx.initialValue]);
  useUpdateEffect(() => {
    formItemCtx.checkValue?.(value1);
  }, [value1]);

  return (
    <Row
      wrap={false}
      align={'middle'}
      style={style}
      className={classNames(
        className,
        styles.container,
        focused && styles.active,
        (error || formItemCtx.error) && styles.error
      )}
    >
      {prefix}
      <input
        value={value}
        ref={inputRef}
        readOnly={readonly}
        disabled={disabled}
        autoComplete={'off'}
        defaultValue={defaultValue}
        type={isPwdType && showPwd ? undefined : type}
        className={classNames(styles.input, !!placeholder && styles.with_label)}
        onChange={(e) => {
          const val = e.target.value;
          onChange?.(val);
          setValue1(val);
          formItemCtx.onChange?.(val);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={(e) => {
          setFocused(false);
          formItemCtx.checkValue?.(e.target.value);
        }}
      />
      {!!placeholder && (
        <div
          className={classNames(
            styles.label,
            (value1 || focused) && styles.active
          )}
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          {placeholder}
        </div>
      )}
      {suffix}
      {isPwdType && (
        <div
          className={styles.icon_eye}
          onClick={() => {
            toggleShowPwd();
          }}
        >
          {showPwd ? <EyeOpen /> : <EyeClose />}
        </div>
      )}
    </Row>
  );
}