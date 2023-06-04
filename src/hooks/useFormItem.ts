import { FormItemContext } from '@/components/Form/FormItem.tsx';
import useUpdate from '@/hooks/useUpdate.ts';
import { useContext, useEffect, useRef } from 'react';

export default function useFormItem<T>(value: T | undefined, defaultValue: T) {
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

  return { finalValue, valueRef, formItemCtx, update };
}
