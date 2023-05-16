import Grid from '@/components/Grid';
import classNames from 'classnames';
import styles from './index.module.less';

export default function ProductSkus() {
  return (
    <div>
      <div className={styles.option_item}>
        <div className={styles.title}>选择产品</div>
        <Grid columns={2} gap={'1.2rem'} className={styles.list}>
          {['Xiaomi 13 Ultra 限量定制色', 'Xiaomi 13 Ultra'].map(
            (item, index) => (
              <div
                key={item}
                className={classNames(
                  styles.item,
                  index === 0 && styles.active
                )}
              >
                {item}
              </div>
            )
          )}
        </Grid>
      </div>
      <div className={styles.option_item}>
        <div className={styles.title}>选择版本</div>
        <Grid columns={2} gap={'1.2rem'} className={styles.list}>
          {['12GB+256GB', '16GB+512GB', '16GB+1TB'].map((item, index) => (
            <div
              key={item}
              className={classNames(styles.item, index === 0 && styles.active)}
            >
              {item}
            </div>
          ))}
        </Grid>
      </div>
      <div className={styles.option_item}>
        <div className={styles.title}>选择颜色</div>
        <Grid columns={2} gap={'1.2rem'} className={styles.list}>
          {['赤霞橙', '星空蓝', '银杏黄'].map((item, index) => (
            <div
              key={item}
              className={classNames(styles.item, index === 0 && styles.active)}
            >
              {item}
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
