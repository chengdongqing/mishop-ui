import Breadcrumb from '@/components/Breadcrumb';
import CommendedProducts from '@/components/CommendedProducts';
import Form from '@/components/Form';
import Grid from '@/components/Grid';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import Space from '@/components/Space';
import useMount from '@/hooks/useMount.ts';
import useSetState from '@/hooks/useSetState.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilterBarItems, ProductItemProps, Products } from './const';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SortBar from './SortBar';

export default function SearchPage() {
  const [loading, setLoading] = useState(true);
  useMount(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      <Breadcrumb value={'全部结果'} split={'>'} />
      <Form noStyle onChange={console.log}>
        <div className={styles.filters}>
          {FilterBarItems.map((item, index) => (
            <Form.Item key={item.value} name={item.value}>
              <FilterBar
                label={item.label}
                options={item.children}
                borderless={index === FilterBarItems.length - 1}
              />
            </Form.Item>
          ))}
        </div>
        <div
          style={{
            backgroundColor: 'var(--color-background)',
            padding: '2rem 0'
          }}
        >
          <div className={styles.container}>
            <SortBar />
            {loading ? (
              <Loading />
            ) : (
              <>
                <ProductList />
                <CommendedProducts mode={'swiper'} />
              </>
            )}
          </div>
        </div>
      </Form>
    </>
  );
}

function ProductList() {
  const [page, setPage] = useSetState(() => ({
    current: 1,
    pageSize: 10,
    totalSize: 156
  }));

  return (
    <div className={styles.products}>
      <Grid columns={4} gap={'1.4rem'}>
        {Products.map((item) => (
          <ProductItem key={item.label} {...item} />
        ))}
      </Grid>
      <Pagination
        {...page}
        onChange={(value) => {
          setPage({
            current: value
          });
        }}
      />
    </div>
  );
}

function ProductItem(props: ProductItemProps) {
  const [pictureIndex, setPictureIndex] = useState(0);

  return (
    <Link className={styles.product_item} to={buildProductUrl(props.label)}>
      <img
        alt={props.label}
        src={props.pictureUrls[pictureIndex]}
        className={styles.picture}
      />
      <div className={styles.label}>{props.label}</div>
      <Space size={'0.4rem'}>
        <div className={styles.price}>{formatAmount(props.price)}</div>
        {!!props.originalPrice && (
          <div className={classNames(styles.price, styles.original)}>
            {formatAmount(props.originalPrice)}
          </div>
        )}
      </Space>
      <Space className={styles.thumbs}>
        {props.pictureUrls.map((item, index) => (
          <img
            key={item}
            src={item}
            alt={props.label}
            className={classNames(
              styles.thumb_item,
              index === pictureIndex &&
                props.pictureUrls.length > 1 &&
                styles.active
            )}
            onMouseEnter={() => {
              setPictureIndex(index);
            }}
          />
        ))}
      </Space>
    </Link>
  );
}
