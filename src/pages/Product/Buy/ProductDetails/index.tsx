import LazyImage from '@/components/LazyImage';
import classNames from 'classnames';
import { useState } from 'react';
import { PriceDescription } from '../index.tsx';
import styles from './index.module.css';

interface DetailItem {
  name: string;
  children: string[];
}

export default function ProductDetails({ items }: { items: DetailItem[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className={styles.navs_bar}>
        {items.map((item, index) => (
          <div
            key={item.name}
            className={classNames(
              styles.nav_item,
              index === current && styles.active
            )}
            onClick={() => {
              setCurrent(index);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'var(--color-background)' }}>
        <div className={styles.content}>
          {items[current].children.map((item) => (
            <LazyImage key={item} src={item} alt={''} width={'100%'} />
          ))}
        </div>

        {current === 0 && <PriceDescription weixin />}
      </div>
    </>
  );
}
