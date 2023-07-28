import Button from '@/components/Button';
import DataContainer from '@/components/DataContainer';
import Pagination from '@/components/Pagination';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { DefaultDateTimeFormat } from '@/consts';
import useQueryParams from '@/hooks/useQueryParams.ts';
import useRequest from '@/hooks/useRequest.ts';
import useSetState from '@/hooks/useSetState.ts';
import UserLayout from '@/layouts/UserLayout';
import { OrderStatus, PaymentMethod } from '@/pages/Orders/enums.ts';
import { fetchOrdersByPage, OrderVO } from '@/services/order.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';
import styles from './index.module.less';

export default function OrdersPage() {
  const queryParams = useQueryParams<{
    status: string;
  }>();
  const [params, setParams] = useSetState<{
    status?: string;
    keyword?: string;
  }>(queryParams);

  const { data, loading, run } = useRequest(
    (pageNumber: number) => {
      return fetchOrdersByPage({
        ...params,
        pageNumber,
        pageSize: 2
      });
    },
    {
      deps: [params]
    }
  );

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
      <FilterBar values={params} onChange={setParams} />
      <DataContainer loading={loading} empty={!data?.totalSize && '暂无数据'}>
        <OrderList page={data} onChange={run} />
      </DataContainer>
    </>
  );
}

function OrderList({
  page,
  onChange
}: {
  page: Page<OrderVO> | null;
  onChange(value: number): void;
}) {
  return (
    <>
      {page?.data.map((item) => (
        <div key={item.id} className={styles.order_item}>
          <div className={styles.header}>
            <div className={styles.order_status}>
              {OrderStatus[item.status]}
            </div>
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
                {moment(item.createdAt).format(DefaultDateTimeFormat)}
                {item.recipientName}
                <span>
                  订单号：
                  <Link to={`/orders/${item.id}`} className={styles.order_id}>
                    {item.orderNumber}
                  </Link>
                </span>
                {PaymentMethod[item.paymentMethod]}
              </Space>
              <div className={styles.amount}>
                实付金额：<span>{formatAmount(item.paidAmount, '')}</span>元
              </div>
            </Row>
          </div>
          <Row className={styles.main}>
            <div className={styles.product_list}>
              {item.items.map((product) => (
                <div key={product.id} className={styles.product_item}>
                  <Space size={'2rem'}>
                    <Link
                      to={buildProductUrl(product.productId)}
                      target={'_blank'}
                    >
                      <img alt={product.productName} src={product.pictureUrl} />
                    </Link>
                    <div>
                      <Link
                        to={buildProductUrl(product.productId)}
                        className={styles.label}
                        target={'_blank'}
                      >
                        {product.productName} {product.skuName}
                      </Link>
                      <div>
                        {formatAmount(product.unitPrice)} x {product.quantity}
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
              {item.status === 'COMPLETED' && !item.isReviewed && (
                <Link to={`/orders/comments/${item.id}`}>
                  <Button outlined className={styles.btn}>
                    评价晒单
                  </Button>
                </Link>
              )}
              {(item.status === 'PENDING_PAYMENT' ||
                item.status === 'PENDING_PACKING' ||
                item.status === 'PENDING_SHIPPING' ||
                item.status === 'PENDING_RECEIVING') && (
                <Button
                  outlined
                  className={classNames(styles.btn, styles.gray)}
                >
                  取消订单
                </Button>
              )}
            </Space>
          </Row>
        </div>
      ))}

      <Pagination {...page} onChange={onChange} />
    </>
  );
}
