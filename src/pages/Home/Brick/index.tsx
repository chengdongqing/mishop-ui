import Grid from '@/components/Grid';
import Iconfont from '@/components/Iconfont';
import LazyImage from '@/components/LazyImage';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { ParentProduct } from '@/services/product.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import { RightCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function HomeBrick({ name, children, banners }: ParentProduct) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={styles.container}>
      <Header
        title={name}
        tabs={children}
        current={currentTab}
        onChange={setCurrentTab}
      />
      <Row>
        <CategoryBanners banners={banners} />
        <CategoryProducts tabs={children} current={currentTab} />
      </Row>
    </div>
  );
}

function Header({
  title,
  tabs,
  current,
  onChange
}: {
  title: string;
  tabs: ParentProduct[];
  current: number;
  onChange: (index: number) => void;
}) {
  return (
    <Row justify={'space-between'} align={'middle'} className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.more}>
        {tabs.length > 1 ? (
          <div className={styles.tabs}>
            {tabs
              .filter((item) => item.products?.length)
              .map((item, index) => (
                <div
                  key={item.id}
                  className={classNames(
                    styles.tab_item,
                    index === current && styles.active
                  )}
                  onMouseEnter={() => {
                    onChange(index);
                  }}
                >
                  {item.name}
                </div>
              ))}
          </div>
        ) : (
          <Link
            to={`/search?categoryId=${tabs[0].id}`}
            className={styles.more_link}
            target={'_blank'}
          >
            查看更多 <RightCircleFilled className={styles.icon} />
          </Link>
        )}
      </div>
    </Row>
  );
}

function CategoryBanners({ banners }: { banners: Banner[] }) {
  return (
    <div className={styles.banners}>
      {banners.slice(0, 2).map((item) => (
        <a
          key={item.src}
          href={item.href}
          target={item.target}
          className={styles.banner_item}
        >
          <LazyImage alt={''} src={item.src} className={styles.picture} />
        </a>
      ))}
    </div>
  );
}

function CategoryProducts({
  tabs,
  current
}: {
  tabs: ParentProduct[];
  current: number;
}) {
  const isMultipleTabs = tabs.length > 1;
  const products = tabs[current].products || [];
  const overflowProduct = products[7];

  return (
    <Grid columns={4} gap={'1.4rem'} className={styles.products}>
      {products
        .slice(0, isMultipleTabs && overflowProduct ? -1 : 8)
        .map((item) => (
          <Link
            key={item.name}
            target={'_blank'}
            to={buildProductUrl(item.name)}
            className={styles.product_item}
          >
            <LazyImage
              className={styles.picture}
              src={`${item.pictureUrl}?w=200&h=200&f=webp&q=90`}
              alt={item.name}
            />
            <div>
              <div className={classNames(styles.label, 'text-ellipsis')}>
                {item.name}
              </div>
              <div className={classNames(styles.description, 'text-ellipsis')}>
                {item.description}
              </div>
              <Space>
                <span className={styles.price}>{formatAmount(item.price)}</span>
                {!!item.originalPrice && (
                  <span className={classNames(styles.price, styles.original)}>
                    {formatAmount(item.originalPrice)}
                  </span>
                )}
              </Space>
            </div>
          </Link>
        ))}

      {isMultipleTabs && (
        <div>
          {!!overflowProduct && (
            <Link
              style={{ marginBottom: '1.4rem' }}
              className={classNames(styles.product_item, styles.small)}
              to={buildProductUrl(overflowProduct.name)}
              target={'_blank'}
            >
              <LazyImage
                className={styles.picture}
                src={overflowProduct.pictureUrl}
                alt={overflowProduct.name}
              />
              <div>
                <div className={classNames(styles.label, 'text-ellipsis')}>
                  {overflowProduct.name}
                </div>
                <span className={styles.price}>{overflowProduct.price}</span>
              </div>
            </Link>
          )}
          <Link
            className={classNames(styles.product_item, styles.small)}
            to={`/search?categoryId=${tabs[current].id}`}
            target={'_blank'}
          >
            <div className={styles.picture}>
              <Iconfont type={'i-arrow-right-circle'} className={styles.icon} />
            </div>
            <div>
              <div className={styles.label}>浏览更多</div>
              <div className={classNames(styles.description, 'text-ellipsis')}>
                {tabs[current].name}
              </div>
            </div>
          </Link>
        </div>
      )}
    </Grid>
  );
}
