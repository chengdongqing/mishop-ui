import Space from '@/components/Space';
import useFormItem from '@/hooks/useFormItem.ts';
import classNames from 'classnames';
import styles from './index.module.css';

interface FilterBarProps {
  all: number;
  items: Record<number, number>;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
}

const options = [
  {
    label: '全部',
    value: undefined
  },
  {
    label: '非常满意',
    value: 5
  },
  {
    label: '比较满意',
    value: 4
  },
  {
    label: '满意',
    value: 3
  },
  {
    label: '失望',
    value: 2
  },
  {
    label: '非常失望',
    value: 1
  }
];

export default function FilterBar({
  all,
  items,
  value: propValue,
  defaultValue,
  onChange
}: FilterBarProps) {
  const [value, setValue] = useFormItem(propValue, defaultValue, onChange);

  return (
    <div className={styles.container}>
      <div className={styles.title}>大家认为</div>

      <div className={styles.categories}>
        <Space size={'2.4rem'}>
          {options.map((item) => (
            <div
              key={item.label}
              className={classNames(
                styles.category_item,
                item.value === value && styles.active
              )}
              onClick={() => {
                setValue(item.value);
                onChange?.(item.value);
              }}
            >
              {item.label}
              <span>
                （{(item.value === undefined ? all : items[item.value]) || 0}）
              </span>
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
}
