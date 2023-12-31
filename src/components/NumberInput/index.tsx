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
  value: propValue,
  defaultValue = 1,
  min = 0,
  max = Number.MAX_VALUE,
  onChange
}: NumberInputProps) {
  const [value, setValue] = useFormItem(propValue, defaultValue, onChange);

  function handleChange(val: number) {
    if (val >= min && val <= max) {
      setValue(val);
    }
  }

  return (
    <div className={styles.container}>
      <Iconfont
        type={'i-minus'}
        className={styles.icon}
        onClick={() => {
          handleChange(value - 1);
        }}
      />
      <input
        type={'number'}
        value={value}
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
          handleChange(value + 1);
        }}
      />
    </div>
  );
}
