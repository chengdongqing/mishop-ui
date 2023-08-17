import useUnmount from '@/hooks/useUnmount.ts';
import { PropsWithStyle } from '@/utils/typings';
import classNames from 'classnames';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import { FormContext } from './index.tsx';
import validate from './validate.ts';

interface FieldInjects {
  // 获取值
  getValue: () => unknown;
  // 设置值
  setValue: (value: unknown) => void;
}

interface FormItemContextProps {
  // 是否错误
  error?: boolean;
  // 是否禁用
  disabled?: boolean;
  // 初始值
  initialValue?: unknown;
  // 注册相关方法
  registerField?(injects: FieldInjects): void;
  // 检查值
  checkValue?(value: unknown): void;
  // 值变化回调入口
  onChange?(value: unknown): void;
}

export const FormItemContext = createContext<FormItemContextProps>({});

export interface FormRule {
  // 是否非空
  required?: boolean;
  // 固定长度
  len?: number;
  // 最小长度/最小值
  min?: number;
  // 最大长度/最大值
  max?: number;
  // 正则表达式
  pattern?: RegExp;
  // 自定义校验函数
  validator?: (value: unknown) => Promise<string | void>;
  // 错误信息描述
  message?: string;
}

interface FormItemProps extends PropsWithStyle, PropsWithChildren {
  name?: string;
  rules?: FormRule[];
  validateOnChange?: boolean;
  initialValue?: unknown;
  noStyle?: boolean;
}

export default function FormItem({
  name,
  rules,
  validateOnChange = true,
  children,
  noStyle,
  style,
  className,
  initialValue: propInitialValue
}: FormItemProps) {
  const formCtx = useContext(FormContext);
  const [injects, setInjects] = useState<FieldInjects>();
  const [initialValue, setInitialValue] = useState<unknown>();
  const [message, setMessage] = useState<string | undefined>();

  const checkValue = useCallback(
    (value?: unknown) => {
      if (Array.isArray(rules) && rules.length) {
        const res = validate(value || injects?.getValue(), rules);
        res.then(() => setMessage(undefined)).catch(setMessage);
        return res;
      }
      return Promise.resolve();
    },
    [injects, rules]
  );

  useEffect(() => {
    if (name) {
      setInitialValue(propInitialValue || formCtx.initialValues?.[name]);
      formCtx.registerField?.(name, {
        resetValue() {
          injects?.setValue(propInitialValue);
        },
        checkValue,
        getValue() {
          return injects?.getValue();
        },
        setValue(value) {
          injects?.setValue(value);
        }
      });
    }
  }, [injects]);

  useUnmount(() => {
    if (name) {
      formCtx.cancelField?.(name);
    }
  });

  return (
    <div
      className={classNames(styles.form_item, className)}
      style={{
        marginTop: noStyle || formCtx.noStyle ? 0 : undefined,
        ...style
      }}
    >
      <FormItemContext.Provider
        value={{
          initialValue,
          error: !!message,
          disabled: formCtx.disabled,
          registerField: setInjects,
          checkValue,
          onChange(value) {
            if (name) {
              formCtx.onChange?.(name, value);
              if (validateOnChange) {
                checkValue(value);
              }
            }
          }
        }}
      >
        {children}
      </FormItemContext.Provider>
      {!!message && <div className={styles.error_tips}>{message}</div>}
    </div>
  );
}
