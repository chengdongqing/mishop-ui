import Breadcrumb from '@/components/Breadcrumb';
import Grid from '@/components/Grid';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import Space from '@/components/Space';
import useMount from '@/hooks/useMount.ts';
import useSetState from '@/hooks/useSetState.ts';
import { buildProductUrl } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FilterBarItems, ProductItemProps, Products } from './const';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SortBar from './SortBar';

export default function SearchPage() {
  const [params, setParams] = useSetState();
  const [loading, setLoading] = useState(true);
  useMount(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <>
      <Breadcrumb value={'全部结果'} split={'>'} />
      <div className={styles.filters}>
        {FilterBarItems.map((item, index) => (
          <FilterBar
            key={item.value}
            label={item.label}
            options={item.children}
            value={params[item.value] as BasicValue}
            borderless={index === FilterBarItems.length - 1}
            onChange={(value) => {
              setParams({
                [item.value]: value
              });
            }}
          />
        ))}
      </div>
      <div
        style={{
          backgroundColor: 'var(--color-background)',
          padding: '2rem 10rem'
        }}
      >
        <div className={styles.container}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <SortBar params={params} onChange={setParams} />
              <ProductList />
            </>
          )}
        </div>
      </div>
    </>
  );
}

function ProductList() {
  return (
    <div className={styles.products}>
      <Grid columns={4} gap={'1.4rem'}>
        {Products.map((item) => (
          <ProductItem key={item.label} {...item} />
        ))}
      </Grid>

      <Pagination />
    </div>
  );
}

function ProductItem(props: ProductItemProps) {
  const [pictureIndex, setPictureIndex] = useState(0);

  return (
    <NavLink className={styles.product_item} to={buildProductUrl(props.label)}>
      <img
        alt={props.label}
        src={props.pictureUrls[pictureIndex]}
        className={styles.picture}
      />
      <div className={styles.label}>{props.label}</div>
      <Space size={'0.4rem'}>
        <div className={styles.price}>{props.price}</div>
        <div className={classNames(styles.price, styles.original)}>
          {props.originalPrice}
        </div>
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
    </NavLink>
  );
}
