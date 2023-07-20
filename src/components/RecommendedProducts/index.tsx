import Button from '@/components/Button';
import Grid from '@/components/Grid';
import LazyImage from '@/components/LazyImage';
import Swiper, { SwiperRef } from '@/components/Swiper';
import useCartOperations from '@/hooks/useCartOperations.ts';
import useRequest from '@/hooks/useRequest.ts';
import { fetchRecommendedProducts, RecommendedProduct } from '@/services/product.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import { PropsWithStyle } from '@/utils/typings';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

interface RecommendedProductsProps extends PropsWithStyle {
  // 标题
  title?: string;
  // 模式
  mode?: 'swiper' | 'static';
}

export default function RecommendedProducts({
                                              title = '猜你喜欢',
                                              mode,
                                              style,
                                              className
                                            }: RecommendedProductsProps) {
  const { data } = useRequest(() => fetchRecommendedProducts(20), {
    initialData: [] as RecommendedProduct[]
  });

  return (
    <div className={classNames(styles.container, className)} style={style}>
      <div className={styles.title}>{title}</div>
      {mode === 'swiper' ? (
        <ProductsSwiper products={data} />
      ) : (
        <ProductBlocks products={data} />
      )}
    </div>
  );
}

function ProductsSwiper({ products }: {
  products: RecommendedProduct[]
}) {
  const swiperRef = useRef<SwiperRef>(null);
  const [current, setCurrent] = useState(0);

  const panels = useMemo(() => {
    const data = [];
    for (let i = 0; i < products.length; i++) {
      if (i % 5 === 0) {
        data.push(products.slice(i, i + 5));
      }
    }
    return data;
  }, [products]);

  return (
    <div>
      <Swiper
        ref={swiperRef}
        interval={5000}
        circular={false}
        indicatorDots={false}
        afterChange={setCurrent}
        style={{ height: '30rem' }}
      >
        {panels.map((item) => (
          <ProductBlocks key={item[0].skuId} products={item} />
        ))}
      </Swiper>
      <div className={styles.swiper_dots}>
        {Array(panels.length)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={classNames(
                styles.dot_item,
                index === current && styles.active
              )}
              onClick={() => {
                swiperRef.current?.to(index);
              }}
            />
          ))}
      </div>
    </div>
  );
}

function ProductBlocks({ products }: {
  products: RecommendedProduct[]
}) {
  return (
    <Grid columns={5} gap={'1.4rem'} style={{ width: 'var(--width-primary)' }}>
      {products.map((item) => (
        <ProductBlock key={item.skuId} {...item} />
      ))}
    </Grid>
  );
}

function ProductBlock(props: RecommendedProduct) {
  const [active, setActive] = useState(false);
  const cartOperations = useCartOperations();

  return (
    <Link className={styles.product_item} to={buildProductUrl(props.productId)}>
      <LazyImage
        alt={props.productName}
        src={props.pictureUrl}
        className={styles.picture}
      />
      <div className={styles.label}>{props.productName}</div>
      <div className={styles.price}>{formatAmount(props.price)}</div>
      {!!props.comments && (
        <div className={styles.comments}>{props.comments}好评</div>
      )}
      <Button
        outlined
        size={'small'}
        className={styles.btn_action}
        onClick={(e) => {
          e.preventDefault();
          cartOperations.add(props, (res) => {
            if (res) {
              setActive(true);
              setTimeout(() => {
                setActive(false);
              }, 1000);
            }
          });
        }}
      >
        加入购物车
      </Button>

      <div className={classNames(styles.notice_bar, active && styles.active)}>
        成功加入购物车
      </div>
    </Link>
  );
}
