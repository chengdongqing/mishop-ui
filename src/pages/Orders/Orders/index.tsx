import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useMount from '@/hooks/useMount.ts';
import useQueryParams from '@/hooks/useQueryParams.ts';
import useSetState from '@/hooks/useSetState.ts';
import UserLayout from '@/layouts/UserLayout';
import { buildProductUrl, formatAmount } from '@/utils';
import { DefaultDateTimeFormat } from '@/utils/constants.ts';
import classNames from 'classnames';
import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { orders } from './const.ts';
import FilterBar from './FilterBar';
import styles from './index.module.less';

export default function OrdersPage() {
  const params = useQueryParams<{ status: string }>();
  const [loading, setLoading] = useState(true);
  useMount(() => {
    console.log('status: ', params.status);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      <UserLayout.Header
        title={'我的订单'}
        extra={
          <span>
            请谨防钓鱼链接或诈骗电话，
            <a
              target={'_blank'}
              href={'https://www.mi.com/service/buy/Avoid%20Fraud'}
            >
              了解更多{'>'}
            </a>
          </span>
        }
      />
      <FilterBar
        onChange={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }}
      />
      {loading ? <Loading /> : <OrderList />}
    </>
  );
}

function OrderList() {
  const [page, setPage] = useSetState(() => ({
    current: 1,
    pageSize: 10,
    totalSize: 156
  }));

  return (
    <>
      {orders.map((item) => (
        <div key={item.id} className={styles.order_item}>
          <div className={styles.header}>
            <div className={styles.order_status}>{item.status}</div>
            <Row
              wrap={false}
              align={'bottom'}
              justify={'space-between'}
              className={styles.order_details}
            >
              <Space
                split={<span style={{ color: 'var(--color-border)' }}>|</span>}
                wrap
              >
                {moment(item.createTime).format(DefaultDateTimeFormat)}
                {item.shippingInfo.username}
                <span>
                  订单号：
                  <Link to={`/orders/${item.id}`} className={styles.order_id}>
                    {item.id}
                  </Link>
                </span>
                {item.paymentMethod}
              </Space>
              <div className={styles.amount}>
                实付金额：<span>{formatAmount(item.paymentAmount, '')}</span>元
              </div>
            </Row>
          </div>
          <Row className={styles.main}>
            <div className={styles.product_list}>
              {item.products.map((product) => (
                <div key={product.name} className={styles.product_item}>
                  <Space size={'2rem'}>
                    <Link to={buildProductUrl(product.id)}>
                      <img alt={product.name} src={product.pictureUrl} />
                    </Link>
                    <div>
                      <Link
                        to={buildProductUrl(product.id)}
                        className={styles.label}
                      >
                        {product.name}
                      </Link>
                      <div>
                        {formatAmount(product.price)} x {product.number}
                      </div>
                    </div>
                  </Space>
                </div>
              ))}
            </div>
            <Space direction={'vertical'} size={'1rem'}>
              <Link to={`/orders/${item.id}`}>
                <Button
                  outlined
                  className={classNames(styles.btn, styles.gray)}
                >
                  订单详情
                </Button>
              </Link>
              <Link to={`/orders/comments/${item.id}`}>
                <Button outlined className={styles.btn}>
                  评价晒单
                </Button>
              </Link>
              <Button outlined className={classNames(styles.btn, styles.gray)}>
                申请售后
              </Button>
              <Button outlined className={classNames(styles.btn, styles.gray)}>
                联系客服
              </Button>
            </Space>
          </Row>
        </div>
      ))}

      <Pagination
        {...page}
        onChange={(value) => {
          setPage({
            current: value
          });
        }}
      />
    </>
  );
}
