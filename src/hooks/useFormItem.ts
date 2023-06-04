import { FormItemContext } from '@/components/Form/FormItem.tsx';
import useLatest from '@/hooks/useLatest.ts';
import { useContext, useEffect, useRef, useState } from 'react';

export default function useFormItem<T, S extends T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: S) => void
) {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = useState(() =>
    isControlled ? value : defaultValue
  );
  const finalValue = isControlled ? value : innerValue;
  const valueRef = useLatest(innerValue);

  const formItemCtx = useContext(FormItemContext);
  useEffect(() => {
    if (formItemCtx.initialValue !== undefined) {
      setInnerValue(formItemCtx.initialValue as T);
    }
    formItemCtx.registerField?.({
      getValue() {
        return valueRef.current;
      },
      setValue(val) {
        if (val !== undefined) {
          setInnerValue(val as T);
        }
      }
    });
  }, [formItemCtx.initialValue]);

  const setValue = useRef((val: S) => {
    formItemCtx.onChange?.(val);
    setInnerValue(val);
    onChange?.(val);
  });

  return [finalValue, setValue.current, formItemCtx] as const;
}
