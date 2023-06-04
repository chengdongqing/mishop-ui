import { FormItemContext } from '@/components/Form/FormItem.tsx';
import useUpdate from '@/hooks/useUpdate.ts';
import { useContext, useEffect, useRef } from 'react';

export default function useFormItem<T, S extends T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: S) => void
) {
  const isControlled = value !== undefined;
  const valueRef = useRef(isControlled ? value : defaultValue);
  const finalValue = isControlled ? value : valueRef.current;
  const update = useUpdate();

  const formItemCtx = useContext(FormItemContext);
  useEffect(() => {
    if (formItemCtx.initialValue !== undefined) {
      valueRef.current = formItemCtx.initialValue as T;
      update();
    }
    formItemCtx.registerField?.({
      getValue() {
        return valueRef.current;
      },
      setValue(val) {
        if (val !== undefined) {
          valueRef.current = val as T;
          update();
        }
      }
    });
  }, [formItemCtx.initialValue]);

  const setValue = useRef((val: S) => {
    formItemCtx.onChange?.(val);
    valueRef.current = val;
    onChange?.(val);
    update();
  });

  return [finalValue, setValue.current, formItemCtx] as const;
}
