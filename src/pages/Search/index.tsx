import Breadcrumb from '@/components/Breadcrumb';
import DataContainer from '@/components/DataContainer';
import Form, { FormRef } from '@/components/Form';
import Grid from '@/components/Grid';
import LazyImage from '@/components/LazyImage';
import Pagination from '@/components/Pagination';
import RecommendedProducts from '@/components/RecommendedProducts';
import Space from '@/components/Space';
import useQueryParams from '@/hooks/useQueryParams.ts';
import useRequest from '@/hooks/useRequest.ts';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { fetchProductBrands, fetchProductCategories, searchProducts } from '@/services/product.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { memo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';
import styles from './index.module.less';
import SortBar from './SortBar';

export type SearchProduct = Omit<Product, 'pictureUrl'> & {
  pictureUrls: string[];
};

export default function SearchPage() {
  const formRef = useRef<FormRef>(null);
  const { keyword, categoryId, brandId } = useQueryParams<{
    keyword?: string;
    categoryId?: string;
    brandId?: string;
  }>();
  const { data, loading, run } = useRequest(
    (values = { keyword, categoryId, brandId }, { pageNumber } = {}) => {
      return searchProducts(
        { ...values, keyword },
        { pageSize: 12, pageNumber }
      );
    },
    {
      initialData: {
        data: []
      }
    }
  );

  useUpdateEffect(() => {
    run({ keyword });
  }, [keyword]);

  return (
    <>
      <Breadcrumb value={'全部结果'} split={'>'} />
      <Form
        noStyle
        ref={formRef}
        initialValues={{
          categoryId: categoryId ? Number(categoryId) : undefined,
          brandId: brandId ? Number(brandId) : undefined
        }}
        onChange={(_changedValues, allValues) => {
          run(allValues);
        }}
      >
        <FilterGroup />
        <div
          style={{
            backgroundColor: 'var(--color-background)',
            padding: '2rem 0'
          }}
        >
          <div className={styles.container}>
            <SortBar />
            <DataContainer
              loading={loading}
              empty={
                !data.totalSize && '对应筛选条件下没有找到商品，换个筛选条件吧'
              }
            >
              <ProductList
                page={data}
                onPageChange={(value) => {
                  run(formRef.current?.getFieldsValue(), {
                    pageNumber: value
                  });
                }}
              />
            </DataContainer>
            <RecommendedProducts mode={'swiper'} />
          </div>
        </div>
      </Form>
    </>
  );
}

const FilterGroup = memo(() => {
  const { data: brands, loading } = useRequest(
    () => fetchProductBrands(100, 0),
    {
      initialData: []
    }
  );
  const { data: categories, loading: loading1 } = useRequest(
    () => fetchProductCategories(100, 0),
    {
      initialData: [],
      convert(item) {
        return item.flatMap((item) => item.children) || [];
      }
    }
  );

  return (
    <div className={styles.filters}>
      <DataContainer loading={loading || loading1}>
        <Form.Item name={'brandId'}>
          <FilterBar label={'品牌'} options={brands} />
        </Form.Item>
        <Form.Item name={'categoryId'}>
          <FilterBar label={'类别'} options={categories} borderless />
        </Form.Item>
      </DataContainer>
    </div>
  );
});

function ProductList({
  page,
  onPageChange
}: {
  page: Page<SearchProduct>;
  onPageChange: (value: number) => void;
}) {
  return (
    <div className={styles.products}>
      <Grid columns={4} gap={'1.4rem'}>
        {page.data?.map((item) => (
          <ProductItem key={item.name} {...item} />
        ))}
      </Grid>
      <Pagination {...page} onChange={onPageChange} />
    </div>
  );
}

function ProductItem(props: SearchProduct) {
  const [pictureIndex, setPictureIndex] = useState(0);

  return (
    <Link className={styles.product_item} to={buildProductUrl(props.name)}>
      <LazyImage
        alt={props.name}
        src={props.pictureUrls[pictureIndex]}
        className={styles.picture}
      />
      <div className={styles.label}>{props.name}</div>
      <Space size={'0.4rem'}>
        <div className={styles.price}>{formatAmount(props.price)}</div>
        {!!props.originalPrice && (
          <div className={classNames(styles.price, styles.original)}>
            {formatAmount(props.originalPrice)}
          </div>
        )}
      </Space>
      <Space className={styles.thumbs}>
        {props.pictureUrls.slice(0, 6).map((item, index) => (
          <img
            key={item}
            src={item}
            alt={props.name}
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
