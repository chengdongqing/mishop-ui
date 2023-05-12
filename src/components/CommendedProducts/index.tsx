import Button from '@/components/Button';
import Grid from '@/components/Grid';
import Swiper, { SwiperHandle } from '@/components/Swiper';
import { buildProductUrl } from '@/utils';
import { PropsWithStyle } from '@/utils/declare';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const swiperRef = useRef<SwiperHandle>(null);
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

function ProductBlocks({ products }: { products: CommendedProduct[] }) {
  return (
    <Grid columns={5} gap={'1.4rem'} style={{ width: 'var(--width-primary)' }}>
      {products.map((item) => (
        <ProductBlock key={item.label} {...item} />
      ))}
    </Grid>
  );
}

function ProductBlock(props: CommendedProduct) {
  const [active, setActive] = useState(false);

  return (
    <Link className={styles.product_item} to={buildProductUrl(props.label)}>
      <img
        alt={props.label}
        src={props.pictureUrl}
        className={styles.picture}
      />
      <div className={styles.label}>{props.label}</div>
      <div className={styles.price}>{props.price}</div>
      {!!props.comments && (
        <div className={styles.comments}>{props.comments}好评</div>
      )}
      <Button
        outlined
        size={'small'}
        className={styles.btn_action}
        onClick={(e) => {
          e.preventDefault();
          setActive(true);
          setTimeout(() => {
            setActive(false);
          }, 1000);
        }}
      >
        加入购物车
      </Button>

      {/* 加入成功提示 */}
      <div className={classNames(styles.notice_bar, active && styles.active)}>
        成功加入购物车
      </div>
    </Link>
  );
}
