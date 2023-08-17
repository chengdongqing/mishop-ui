import Grid from '@/components/Grid';
import { ProductSKU } from '@/services/product.ts';
import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './index.module.css';
import useSkus from './useSkus.ts';

export default function ProductSkus({
  items,
  onChange
}: {
  items: ProductSKU[];
  onChange: (value?: ProductSKU) => void;
}) {
  const { categories, activeSkus, activeSku, switchSku } = useSkus(items);
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
