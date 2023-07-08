import Grid from '@/components/Grid';
import useFormItem from '@/hooks/useFormItem.ts';
import useToggle from '@/hooks/useToggle.ts';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './index.module.less';

export default function FilterBar({
  label,
  options,
  value: propValue,
  defaultValue,
  borderless,
  onChange
}: {
  label: string;
  options: OptionItem[];
  value?: BasicValue;
  defaultValue?: BasicValue;
  borderless?: boolean;
  onChange?: (value: BasicValue) => void;
}) {
  const [value, setValue] = useFormItem(propValue, defaultValue, onChange);
  const [expand, toggleExpand] = useToggle();
  const height = useMemo(() => {
    let h = '4.8rem';
    if (expand) {
      h = `calc(${h} * ${Math.ceil((options.length + 1) / 7)})`;
    }
    return h;
  }, [expand, options.length]);

  return (
    <div
      className={styles.container}
      style={{ borderBottom: borderless ? 'none' : undefined }}
    >
      <div className={styles.label}>{label}:</div>
      <Grid columns={7} className={styles.options} style={{ height }}>
        <div className={styles.item}>
          <span
            className={classNames(value === undefined && styles.active)}
            onClick={() => {
              setValue(undefined);
            }}
          >
            全部
          </span>
        </div>
        {options.map((item) => (
          <div className={styles.item} key={item.id}>
            <span
              className={classNames(value === item.id && styles.active)}
              onClick={() => {
                setValue(item.id);
              }}
            >
              {item.name}
            </span>
          </div>
        ))}
      </Grid>
      <div style={{ width: '6rem' }}>
        {options.length >= 7 && (
          <div
            className={styles.btn_more}
            onClick={() => {
              toggleExpand();
            }}
          >
            更多
            <DownOutlined
              className={classNames(styles.icon, expand && styles.active)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
