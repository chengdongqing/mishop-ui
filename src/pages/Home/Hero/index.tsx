import Swiper, { SwiperRef } from '@/components/Swiper';
import useRequest from '@/hooks/useRequest.ts';
import { fetchBanners } from '@/services/banner.ts';
import { fetchProductCategories } from '@/services/product.ts';
import { buildProductUrl } from '@/utils';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const { data: categories } = useRequest(fetchProductCategories, {
    defaultParams: [10, 24],
    initialData: [],
    convert(res) {
      return (
        res.data?.map((item) => ({
          ...item,
          products: item.children.flatMap((item1) => item1.products)
        })) || []
      );
    }
  });

  const timer = useRef<NodeJS.Timer>();
  const [products, setProducts] = useState<Product[]>();
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div
      className={styles.category_panel}
      onMouseLeave={() => {
        timer.current = setTimeout(() => {
          setProducts([]);
          setActiveIndex(-1);
        }, 200);
      }}
      onMouseEnter={() => {
        clearTimeout(timer.current);
      }}
    >
      {categories.map((item, index) => (
        <div
          key={item.id}
          className={classNames(
            styles.category_item,
            activeIndex === index && styles.active
          )}
          onMouseEnter={() => {
            setProducts(item.products);
            setActiveIndex(index);
          }}
        >
          <span className={styles.label}>{item.name}</span>
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
          key={item.name}
          className={styles.product_item}
          to={buildProductUrl(item.name)}
        >
          <img
            alt={item.name}
            src={item.pictureUrl}
            className={styles.picture}
          />
          <span className={classNames(styles.label, 'text-ellipsis')}>
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

function BannerSwiper() {
  const swiperRef = useRef<SwiperRef>(null);
  const { data } = useRequest(fetchBanners, {
    defaultParams: ['hero'],
    initialData: []
  });

  return (
    <div className={styles.banner_card}>
      <Swiper
        ref={swiperRef}
        animation={'fade'}
        className={styles.banner_swiper}
      >
        {data.map((item) => (
          <a
            key={item.id}
            rel={'nofollow'}
            href={item.href}
            target={item.target}
            className={styles.banner_item}
          >
            <img
              src={item.src}
              draggable={false}
              className={styles.picture}
              alt={''}
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
