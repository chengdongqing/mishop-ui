import Space from '@/components/Space';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import styles from './index.module.less';

type Item = { label: string; href?: string };

interface BreadcrumbProps {
  value: Item[] | Item | string;
  split?: ReactNode;
}

export default function Breadcrumb({ value, split = '/' }: BreadcrumbProps) {
  const items = useMemo(() => {
    const items1: Item[] = [{ label: '首页', href: '/' }];
    if (Array.isArray(value)) {
      items1.push(...value);
    } else if (typeof value === 'string') {
      items1.push({ label: value });
    } else {
      items1.push(value);
    }
    return items1;
  }, [value]);

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={styles.container}>
        <Space split={<span className={styles.sep}>{split}</span>}>
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={classNames(styles.item, !!item.href && styles.active)}
            >
              {item.label}
            </a>
          ))}
        </Space>
      </div>
    </div>
  );
}
