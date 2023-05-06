import Space from '@/components/Space';
import classNames from 'classnames';
import { ReactNode, useMemo } from 'react';
import styles from './index.module.less';

type Item = { label: string; href?: string };

interface BreadcrumbProps {
  values: Item[] | Item | string;
  split?: ReactNode;
}

export default function Breadcrumb({ values, split = '/' }: BreadcrumbProps) {
  const items = useMemo(() => {
    const items1: Item[] = [{ label: '首页', href: '/' }];
    if (Array.isArray(values)) {
      items1.push(...values);
    } else if (typeof values === 'string') {
      items1.push({ label: values });
    } else {
      items1.push(values);
    }
    return items1;
  }, [values]);

  return (
    <Space
      className={styles.container}
      split={<span className={styles.sep}>{split}</span>}
    >
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
  );
}
