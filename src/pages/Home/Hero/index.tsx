import Swiper, { SwiperHandle } from '@/components/Swiper';
import { buildProductUrl } from '@/utils';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banners, ProductCategories } from './const.ts';
import styles from './index.module.less';

export default function HomeHero() {
  return (
    <div className={styles.container}>
      <CategoryPanel />
      <BannerSwiper />
    </div>
  );
}

function CategoryPanel() {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div
      className={styles.category_panel}
      onMouseLeave={() => {
        setProducts([]);
        setActiveIndex(-1);
      }}
    >
      {ProductCategories.map((item, index) => (
        <div
          key={item.label}
          className={classNames(
            styles.category_item,
            activeIndex === index && styles.active
          )}
          onMouseEnter={() => {
            setProducts(item.children);
            setActiveIndex(index);
          }}
        >
          <span className={styles.label}>{item.label}</span>
          <RightOutlined className={styles.icon} />
        </div>
      ))}

      <ProductsPanel open={!!products?.length} products={products || []} />
    </div>
  );
}

function ProductsPanel({
  open,
  products
}: {
  open: boolean;
  products: Product[];
}) {
  return (
    <div
      className={styles.products_panel}
      style={{
        display: open ? 'flex' : 'none',
        width: `calc(24.8rem * ${Math.ceil(Math.min(products.length, 24) / 6)})`
      }}
    >
      {products.slice(0, 24).map((item) => (
        <Link
          key={item.label}
          className={styles.product_item}
          to={buildProductUrl(item.label)}
        >
          <img
            alt={item.label}
            src={item.pictureUrl}
            className={styles.picture}
          />
          <span className={classNames(styles.label, 'text-ellipsis')}>
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

function BannerSwiper() {
  const swiperRef = useRef<SwiperHandle>(null);

  return (
    <div className={styles.banner_card}>
      <Swiper
        ref={swiperRef}
        animation={'fade'}
        className={styles.banner_swiper}
      >
        {Banners.map((item) => (
          <a
            key={item.src}
            className={styles.banner_item}
            href={item.href}
            target={'_blank'}
            rel={'nofollow'}
          >
            <img
              src={item.src}
              draggable={false}
              alt={item.description}
              title={item.description}
              className={styles.picture}
            />
          </a>
        ))}
      </Swiper>

      <div
        className={classNames(styles.btn, styles.left)}
        onClick={() => {
          swiperRef.current?.prev();
        }}
      >
        <LeftOutlined />
      </div>
      <div
        className={classNames(styles.btn, styles.right)}
        onClick={() => {
          swiperRef.current?.next();
        }}
      >
        <RightOutlined />
      </div>
    </div>
  );
}
