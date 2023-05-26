import Grid from '@/components/Grid';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Xiaomi13Skus } from './const.ts';
import styles from './index.module.less';
import useSkus from './useSkus.ts';

export interface ProductSku {
  id: number;
  price: number;
  picture: string;
  pictures: string[];
  items: {
    name: string;
    value: string;
  }[];
}

export default function ProductSkus({
  onChange
}: {
  onChange: (value?: ProductSku) => void;
}) {
  const { categories, activeSkus, activeSku, switchSku } =
    useSkus(Xiaomi13Skus);
  useEffect(() => {
    onChange(activeSku);
  }, [activeSku, onChange]);

  return (
    <div>
      {categories.map((item) => (
        <div key={item.name} className={styles.option_item}>
          <div className={styles.title}>选择{item.name}</div>
          <Grid columns={2} gap={'1.2rem'} className={styles.list}>
            {item.children.map((item1) => (
              <div
                key={item1}
                className={classNames(
                  styles.item,
                  activeSkus[item.name] === item1 && styles.active
                )}
                onClick={() => {
                  switchSku(item.name, item1);
                }}
              >
                {item1}
              </div>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  );
}
