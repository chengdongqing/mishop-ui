import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { validateValue } from './helpers.ts';
import styles from './index.module.less';
import { FormContext } from './index.tsx';

interface FieldInjects {
  // 获取值
  getValue: () => unknown;
  // 设置值
  setValue: (value: unknown) => void;
}

interface FormItemContextProps {
  // 是否错误
  error?: boolean;
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

interface FormItemProps extends PropsWithChildren {
  name?: string;
  rules?: FormRule[];
  initialValue?: unknown;
}

export default function FormItem({
  name,
  rules,
  children,
  initialValue: initialValue1
}: FormItemProps) {
  const formCtx = useContext(FormContext);
  const [injects, setInjects] = useState<FieldInjects>();
  const [initialValue, setInitialValue] = useState<unknown>();
  const [message, setMessage] = useState<string | undefined>();

  const checkValue = useCallback(
    (value?: unknown) => {
      const res = validateValue(value || injects?.getValue(), rules);
      res.then(() => setMessage(undefined)).catch(setMessage);
      return res;
    },
    [injects, rules]
  );

  useEffect(() => {
    if (name) {
      setInitialValue(initialValue1 || formCtx.initialValues?.[name]);
      formCtx.registerFields?.(name, {
        resetValue() {
          injects?.setValue(initialValue1);
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

  return (
    <div className={styles.form_item}>
      <FormItemContext.Provider
        value={{
          initialValue,
          error: !!message,
          registerField: setInjects,
          checkValue,
          onChange(value) {
            if (name) {
              formCtx.onChange?.(name, value);
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
