import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import useRequest from '@/hooks/useRequest.ts';
import { fetchHotProducts, fetchProductBrands, fetchProductNamesLike } from '@/services/product.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaceholder } from './helpers.ts';
import styles from './index.module.less';

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
        <SearchBox />
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

function SearchBox() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const { data: productNames } = useRequest(fetchHotProducts, {
    initialData: [],
    onSuccess(res) {
      setKeywords(res);
    }
  });
  const placeholder = usePlaceholder(productNames);
  const { run: query } = useRequest(fetchProductNamesLike, {
    manual: true,
    onSuccess: setKeywords
  });

  const navigate = useNavigate();

  return (
    <SearchBar
      placeholder={placeholder}
      keywords={keywords}
      onSearch={(value) => {
        if (value) {
          navigate(`/search?keyword=${encodeURIComponent(value)}`);
        }
      }}
      onChange={(value) => {
        if (value) {
          query(value);
        } else {
          setKeywords(productNames);
        }
      }}
    />
  );
}

function CategoryBar({
                       timer,
                       onChange
                     }: {
  timer: MutableRefObject<NodeJS.Timer | undefined>;
  onChange: (items: Product[] | undefined) => void;
}) {
  const { data } = useRequest(fetchProductBrands, {
    defaultParams: [10, 6],
    initialData: []
  });

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
      {data.map((item) => (
        <a
          key={item.id}
          className={styles.label}
          onMouseEnter={() => {
            onChange(item.products);
          }}
        >
          {item.name}
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
            key={item.name}
            className={styles.product_item}
            onClick={() => {
              navigate(buildProductUrl(item.name));
              onMouseLeave();
            }}
          >
            <img
              className={styles.picture}
              src={item.pictureUrl}
              alt={item.name}
            />
            <div className={styles.label}>{item.name}</div>
            <div className={styles.price}>{formatAmount(item.price)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
