import Button from '@/components/Button';
import Grid from '@/components/Grid';
import Swiper from '@/components/Swiper';
import { buildProductUrl } from '@/utils';
import { PropsWithStyle } from '@/utils/declare';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { CommendedProduct, Products } from './const.ts';
import styles from './index.module.less';

interface CommendedProductsProps extends PropsWithStyle {
  // 标题
  title?: string;
  // 模式
  mode?: 'swiper' | 'static';
}

export default function CommendedProducts({
  title = '猜你喜欢',
  mode = 'swiper',
  style,
  className
}: CommendedProductsProps) {
  return (
    <div className={classNames(styles.container, className)} style={style}>
      <div className={styles.title}>{title}</div>
      {mode === 'swiper' ? (
        <Swiper
          interval={5000}
          indicatorDots={false}
          style={{ height: '30rem', marginBottom: '10rem' }}
        >
          <ProductBlocks products={Products.slice(0, 5)} />
          <ProductBlocks products={Products.slice(5, 10)} />
        </Swiper>
      ) : (
        <ProductBlocks products={Products} />
      )}
    </div>
  );
}

function ProductBlocks({ products }: { products: CommendedProduct[] }) {
  return (
    <Grid columns={5} gap={'1.4rem'} style={{ width: 'var(--width-primary)' }}>
      {products.map((item) => (
        <NavLink
          key={item.label}
          className={styles.product_item}
          to={buildProductUrl(item.label)}
        >
          <img
            alt={item.label}
            src={item.pictureUrl}
            className={styles.picture}
          />
          <div className={styles.label}>{item.label}</div>
          <div className={styles.price}>{item.price}</div>
          {!!item.comments && (
            <div className={styles.comments}>{item.comments}好评</div>
          )}
          <Button
            outlined
            size={'small'}
            className={styles.btn_action}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            加入购物车
          </Button>
        </NavLink>
      ))}
    </Grid>
  );
}
