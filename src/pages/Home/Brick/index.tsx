import styles from './index.module.less';
import Row from '@/components/Row';
import { RightCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { toProductUrl } from '@/utils';
import Space from '@/components/Space';
import Grid from '@/components/Grid';

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
        <ProductBlocks tab={tabs[currentTab]} />
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
          <a
            className={styles.more_link}
            href={'https://www.mi.com/p/1915.html'}
            target={'_blank'}
          >
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

function ProductBlocks({ tab }: { tab: ProductCategory }) {
  return (
    <Grid columns={4} gap={'1.4rem'} className={styles.products}>
      {tab.children?.map((item) => (
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
        </NavLink>
      ))}
    </Grid>
  );
}
