import Grid from '@/components/Grid';
import useToggle from '@/hooks/useToggle.ts';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './index.module.less';

export default function FilterBar({
  label,
  value,
  options,
  borderless,
  onChange
}: OptionItem & {
  options: OptionItem[];
  borderless?: boolean;
  onChange?: (value: BasicValue) => void;
}) {
  const [expand, toggleExpand] = useToggle();
  const height = useMemo(() => {
    let h = '4.8rem';
    if (expand) {
      h = `calc(${h} * ${Math.ceil((options.length + 1) / 7)})`;
    }
    return h;
  }, [expand, options.length]);
  const fullOptions = useMemo(() => {
    return ([{ label: '全部', value: undefined }] as OptionItem[]).concat(
      options
    );
  }, [options]);

  return (
    <div
      className={styles.container}
      style={{ borderBottom: borderless ? 'none' : undefined }}
    >
      <div className={styles.label}>{label}:</div>
      <Grid columns={7} className={styles.options} style={{ height }}>
        {fullOptions.map((item, index) => (
          <div
            className={classNames(
              styles.item,
              item.value === value && styles.active,
              'text-ellipsis'
            )}
            key={item.label + index}
            onClick={() => {
              onChange?.(item.value);
            }}
          >
            <span>{item.label}</span>
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
