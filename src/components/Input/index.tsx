import { EyeClose, EyeOpen } from '@/components/Iconfont';
import Row from '@/components/Row';
import useFormItem from '@/hooks/useFormItem.ts';
import useToggle from '@/hooks/useToggle.ts';
import { PropsWithStyle } from '@/utils/typings';
import classNames from 'classnames';
import { ReactNode, useMemo, useRef, useState } from 'react';
import styles from './index.module.less';

interface InputProps extends PropsWithStyle {
  value?: string | number;
  defaultValue?: string | number;
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
  value: propValue,
  defaultValue = '',
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [showPwd, toggleShowPwd] = useToggle();
  const isPwdType = useMemo(() => type === 'password', [type]);
  const [value, setValue, ctx] = useFormItem(propValue, defaultValue, onChange);

  return (
    <Row
      wrap={false}
      align={'middle'}
      style={style}
      className={classNames(
        className,
        styles.container,
        focused && styles.active,
        (error || ctx.error) && styles.error
      )}
    >
      {prefix}
      <input
        ref={inputRef}
        value={value}
        readOnly={readonly}
        disabled={disabled}
        autoComplete={'off'}
        type={isPwdType && showPwd ? undefined : type}
        className={classNames(styles.input, !!placeholder && styles.with_label)}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={(e) => {
          setFocused(false);
          if (!disabled && !readonly) {
            ctx.checkValue?.(e.target.value);
          }
        }}
      />
      {!!placeholder && (
        <div
          className={classNames(
            styles.label,
            (value || (focused && !disabled && !readonly)) && styles.active
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
