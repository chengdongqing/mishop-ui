import Button from '@/components/Button';
import Grid from '@/components/Grid';
import LazyImage from '@/components/LazyImage';
import Swiper, { SwiperRef } from '@/components/Swiper';
import useRequest from '@/hooks/useRequest.ts';
import { fetchRecommendedProducts } from '@/services/product.ts';
import cartSlice from '@/store/slices/cartSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import { PropsWithStyle } from '@/utils/typings';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { useStore } from 'react-redux';
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
    initialData: []
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
  products: Product[]
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
          <ProductBlocks key={item[0].name} products={item} />
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
  products: Product[]
}) {
  return (
    <Grid columns={5} gap={'1.4rem'} style={{ width: 'var(--width-primary)' }}>
      {products.map((item) => (
        <ProductBlock key={item.name} {...item} />
      ))}
    </Grid>
  );
}

function ProductBlock(props: Product) {
  const [active, setActive] = useState(false);
  const store = useStore();

  return (
    <Link className={styles.product_item} to={buildProductUrl(props.id)}>
      <LazyImage
        alt={props.name}
        src={props.pictureUrl}
        className={styles.picture}
      />
      <div className={styles.label}>{props.name}</div>
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

          store.dispatch(
            cartSlice.actions.putProduct({
              product: {
                ...props,
                checked: true,
                number: 1
              },
              callback(successful) {
                if (successful) {
                  setActive(true);
                  setTimeout(() => {
                    setActive(false);
                  }, 1000);
                }
              }
            })
          );
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