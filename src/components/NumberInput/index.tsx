import Iconfont from '@/components/Iconfont';
import useFormItem from '@/hooks/useFormItem.ts';
import styles from './index.module.less';

interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;

  onChange?(value: number): void;
}

export default function NumberInput({
  value,
  defaultValue = 1,
  min = 0,
  max = Number.MAX_VALUE,
  onChange
}: NumberInputProps) {
  const { finalValue, valueRef, formItemCtx, update } = useFormItem(
    value,
    defaultValue
  );

  function handleChange(val: number) {
    if (val >= min && val <= max) {
      formItemCtx.onChange?.(val);
      valueRef.current = val;
      onChange?.(val);
      update();
    }
  }

  return (
    <div className={styles.container}>
      <Iconfont
        type={'i-minus'}
        className={styles.icon}
        onClick={() => {
          handleChange(finalValue - 1);
        }}
      />
      <input
        type={'number'}
        value={finalValue}
        className={styles.input}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (Number.isInteger(val) && val >= 0) {
            handleChange(val);
          }
        }}
      />
      <Iconfont
        type={'i-plus'}
        className={styles.icon}
        onClick={() => {
          handleChange(finalValue + 1);
        }}
      />
    </div>
  );
}
