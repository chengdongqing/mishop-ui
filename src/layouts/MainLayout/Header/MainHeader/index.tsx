import LogoIcon from '@/assets/logo.png';
import { buildProductUrl } from '@/utils';
import classNames from 'classnames';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductCategories } from './const';
import styles from './index.module.less';
import SearchBar from './SearchBar';

export default function MainHeader() {
  const [activeProducts, setActiveProducts] = useState<Product[] | undefined>();
  const timer = useRef<NodeJS.Timer>();

  return (
    <div>
      <div className={styles.container}>
        <div style={{ width: '23.4rem' }}>
          <NavLink to={'/'}>
            <img src={LogoIcon} className={styles.logo_icon} alt={'logo'} />
          </NavLink>
        </div>
        <CategoryBar timer={timer} onChange={setActiveProducts} />
        <SearchBar />
      </div>

      <ProductsPanel
        open={!!activeProducts?.length}
        products={activeProducts}
        onMouseEnter={() => {
          clearTimeout(timer.current);
        }}
        onMouseLeave={() => {
          timer.current = setTimeout(() => {
            setActiveProducts(undefined);
          }, 200);
        }}
      />
    </div>
  );
}

function CategoryBar({
  timer,
  onChange
}: {
  timer: MutableRefObject<NodeJS.Timer | undefined>;
  onChange: (items: Product[] | undefined) => void;
}) {
  return (
    <div
      className={styles.category_bar}
      onMouseEnter={() => {
        clearTimeout(timer.current);
      }}
      onMouseLeave={() => {
        timer.current = setTimeout(() => {
          onChange(undefined);
        }, 200);
      }}
    >
      {ProductCategories.map((item) => (
        <a
          key={item.label}
          className={styles.label}
          href={item.href}
          target={'_blank'}
          onMouseEnter={() => {
            onChange(item.children);
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

function ProductsPanel({
  open,
  products,
  onMouseEnter,
  onMouseLeave
}: {
  open: boolean;
  products: Product[] | undefined;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [hidden, setHidden] = useState(true);
  const [active, setActive] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timer;
    if (!open) {
      setActive(false);
      timer = setTimeout(() => {
        setHidden(true);
      }, 300);
    } else {
      setHidden(false);
      timer = setTimeout(() => {
        setActive(true);
      }, 10);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  return (
    <div
      hidden={hidden}
      className={classNames(styles.products_panel, active && styles.active)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.wrapper}>
        {products?.map((item) => (
          <NavLink
            key={item.label}
            to={buildProductUrl(item.label)}
            className={styles.product_item}
          >
            <img
              className={styles.picture}
              src={item.pictureUrl}
              alt={item.label}
            />
            <div className={styles.label}>{item.label}</div>
            <div className={styles.price}>{item.price}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
