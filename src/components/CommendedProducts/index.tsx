import Button from '@/components/Button';
import Grid from '@/components/Grid';
import LazyImage from '@/components/LazyImage';
import Swiper, { SwiperRef } from '@/components/Swiper';
import cartSlice from '@/store/slices/cartSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import { PropsWithStyle } from '@/utils/typings';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { Products } from './const.ts';
import styles from './index.module.less';

interface CommendedProductsProps extends PropsWithStyle {
  // 标题
  title?: string;
  // 模式
  mode?: 'swiper' | 'static';
}

export default function CommendedProducts({
  title = '猜你喜欢',
  mode,
  style,
  className
}: CommendedProductsProps) {
  return (
    <div className={classNames(styles.container, className)} style={style}>
      <div className={styles.title}>{title}</div>
      {mode === 'swiper' ? (
        <ProductsSwiper />
      ) : (
        <ProductBlocks products={Products} />
      )}
    </div>
  );
}

function ProductsSwiper() {
  const swiperRef = useRef<SwiperRef>(null);
  const [current, setCurrent] = useState(0);

  const panels = useMemo(() => {
    const products = [];
    for (let i = 0; i < Products.length; i++) {
      if (i % 5 === 0) {
        products.push(Products.slice(i, i + 5));
      }
    }
    return products;
  }, []);

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
          <ProductBlocks key={item[0].label} products={item} />
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

function ProductBlocks({ products }: { products: Product[] }) {
  return (
    <Grid columns={5} gap={'1.4rem'} style={{ width: 'var(--width-primary)' }}>
      {products.map((item) => (
        <ProductBlock key={item.label} {...item} />
      ))}
    </Grid>
  );
}

function ProductBlock(props: Product) {
  const [active, setActive] = useState(false);
  const store = useStore();

  return (
    <Link className={styles.product_item} to={buildProductUrl(props.label)}>
      <LazyImage
        alt={props.label}
        src={props.pictureUrl}
        className={styles.picture}
      />
      <div className={styles.label}>{props.label}</div>
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
