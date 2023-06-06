import Grid from '@/components/Grid';
import Iconfont from '@/components/Iconfont';
import LazyImage from '@/components/LazyImage';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { buildProductUrl, formatAmount } from '@/utils';
import { RightCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export interface HomeBrickProps {
  title: string;
  tabs: ProductCategory[];
  promos: Promo[];
}

export default function HomeBrick({ title, tabs, promos }: HomeBrickProps) {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className={styles.container}>
      <Header
        title={title}
        tabs={tabs}
        current={currentTab}
        onChange={setCurrentTab}
      />
      <Row>
        <PromoBlocks promos={promos} />
        <ProductBlocks tabs={tabs} current={currentTab} />
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
  tabs: ProductCategory[];
  current: number;
  onChange: (index: number) => void;
}) {
  return (
    <Row justify={'space-between'} align={'middle'} className={styles.header}>
      <div className={styles.title}>{title}</div>
      <div className={styles.more}>
        {tabs.length > 1 ? (
          <div className={styles.tabs}>
            {tabs.map((item, index) => (
              <div
                className={classNames(
                  styles.tab_item,
                  index === current && styles.active
                )}
                key={item.label}
                onMouseEnter={() => {
                  onChange(index);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        ) : (
          <a className={styles.more_link} href={tabs[0].href} target={'_blank'}>
            查看更多 <RightCircleFilled className={styles.icon} />
          </a>
        )}
      </div>
    </Row>
  );
}

function PromoBlocks({ promos }: { promos: Promo[] }) {
  return (
    <div className={styles.promos}>
      {promos.slice(0, 2).map((item) => (
        <a
          key={item.src}
          href={item.href}
          target={'_blank'}
          className={styles.promo_item}
        >
          <LazyImage
            src={item.src}
            alt={item.description}
            className={styles.picture}
          />
        </a>
      ))}
    </div>
  );
}

function ProductBlocks({
  tabs,
  current
}: {
  tabs: ProductCategory[];
  current: number;
}) {
  const isMultipleTabs = tabs.length > 1;
  const products = tabs[current].children || [];
  const overflowProduct = products[7];

  return (
    <Grid columns={4} gap={'1.4rem'} className={styles.products}>
      {products
        .slice(0, isMultipleTabs && overflowProduct ? -1 : 8)
        .map((item) => (
          <Link
            key={item.label}
            className={styles.product_item}
            to={buildProductUrl(item.label)}
            target={'_blank'}
          >
            <LazyImage
              className={styles.picture}
              src={item.pictureUrl}
              alt={item.label}
            />
            <div>
              <div className={classNames(styles.label, 'text-ellipsis')}>
                {item.label}
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
              to={buildProductUrl(overflowProduct.label)}
              target={'_blank'}
            >
              <LazyImage
                className={styles.picture}
                src={overflowProduct.pictureUrl}
                alt={overflowProduct.label}
              />
              <div>
                <div className={classNames(styles.label, 'text-ellipsis')}>
                  {overflowProduct.label}
                </div>
                <span className={styles.price}>{overflowProduct.price}</span>
              </div>
            </Link>
          )}
          <Link
            className={classNames(styles.product_item, styles.small)}
            to={`/search?keyword=${tabs[current].label}`}
            target={'_blank'}
          >
            <div className={styles.picture}>
              <Iconfont type={'i-arrow-right-circle'} className={styles.icon} />
            </div>
            <div>
              <div className={styles.label}>浏览更多</div>
              <div className={classNames(styles.description, 'text-ellipsis')}>
                {tabs[current].label}
              </div>
            </div>
          </Link>
        </div>
      )}
    </Grid>
  );
}
