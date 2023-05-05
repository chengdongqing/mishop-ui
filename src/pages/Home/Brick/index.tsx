import styles from './index.module.less';
import Row from '@/components/Row';
import { RightCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { toProductUrl } from '@/utils';
import Space from '@/components/Space';
import Grid from '@/components/Grid';
import Iconfont from '@/components/Iconfont';

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
          <img
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
          <NavLink
            key={item.label}
            className={styles.product_item}
            to={toProductUrl(item.label)}
            target={'_blank'}
          >
            <img
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
                <span className={styles.price}>{item.price}</span>
                <span className={classNames(styles.price, styles.original)}>
                  {item.price}
                </span>
              </Space>
            </div>
          </NavLink>
        ))}

      {isMultipleTabs && (
        <div>
          {!!overflowProduct && (
            <NavLink
              style={{ marginBottom: '1.4rem' }}
              className={classNames(styles.product_item, styles.small)}
              to={toProductUrl(overflowProduct.label)}
              target={'_blank'}
            >
              <img
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
            </NavLink>
          )}
          <NavLink
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
          </NavLink>
        </div>
      )}
    </Grid>
  );
}
