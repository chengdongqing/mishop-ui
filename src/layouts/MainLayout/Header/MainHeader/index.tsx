import Logo from '@/components/Logo';
import { buildProductUrl, displayAmount } from '@/utils';
import classNames from 'classnames';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
          <Logo />
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

  const navigate = useNavigate();

  return (
    <div
      hidden={hidden}
      className={classNames(styles.products_panel, active && styles.active)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.wrapper}>
        {products?.map((item) => (
          <div
            key={item.label}
            className={styles.product_item}
            onClick={() => {
              navigate(buildProductUrl(item.label));
              window.location.reload();
            }}
          >
            <img
              className={styles.picture}
              src={item.pictureUrl}
              alt={item.label}
            />
            <div className={styles.label}>{item.label}</div>
            <div className={styles.price}>{displayAmount(item.price)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
