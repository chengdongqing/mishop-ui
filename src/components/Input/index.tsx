import EyeClose from '@/components/Iconfont/EyeClose.tsx';
import EyeOpen from '@/components/Iconfont/EyeOpen.tsx';
import useToggle from '@/hooks/useToggle.ts';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import styles from './index.module.less';

interface InputProps {
  value?: string | number;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  error?: boolean;

  onChange?(value: string): void;
}

export default function Input({
  value,
  placeholder,
  type,
  error,
  onChange
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const [showPwd, toggleShowPwd] = useToggle();
  const isPwdType = useMemo(() => type === 'password', [type]);

  return (
    <div
      className={classNames(
        styles.container,
        focused && styles.active,
        error && styles.error
      )}
    >
      <input
        ref={inputRef}
        value={value}
        type={isPwdType && showPwd ? undefined : type}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />
      <div
        className={classNames(
          styles.label,
          (!!value || focused) && styles.active
        )}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        {placeholder}
      </div>

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
    </div>
  );
}
