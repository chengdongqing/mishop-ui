import DataContainer from '@/components/DataContainer';
import Pagination from '@/components/Pagination';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { DefaultDateTimeFormat } from '@/consts';
import useQueryParams from '@/hooks/useQueryParams.ts';
import useRequest from '@/hooks/useRequest.ts';
import useSetState from '@/hooks/useSetState.ts';
import UserLayout from '@/layouts/UserLayout';
import ActionGroup from '@/pages/Orders/components/ActionGroup';
import { OrderStatus, PaymentMethod } from '@/pages/Orders/enums.ts';
import { fetchOrdersByPage, OrderVO } from '@/services/order.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';
import styles from './index.module.css';

export default function OrdersPage() {
  const queryParams = useQueryParams<{
    status: string;
  }>();
  const [params, setParams] = useSetState<{
    status?: string;
    keyword?: string;
  }>(queryParams);

  const {
    data,
    loading,
    run: refresh
  } = useRequest(
    (pageNumber: number) => {
      return fetchOrdersByPage({
        ...params,
        pageNumber
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
        <OrderList page={data} onChange={refresh} />
      </DataContainer>
    </>
  );
}

function OrderList({
  page,
  onChange
}: {
  page: Page<OrderVO> | null;
  onChange(value?: number): void;
}) {
  return (
    <>
      {page?.data.map((item) => (
        <div key={item.id} className={styles.order_item}>
          <div className={styles.header}>
            <div
              className={classNames(
                styles.order_status,
                !['PENDING_PAYMENT', 'CANCELED'].includes(item.status) &&
                  styles.active
              )}
            >
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
                {!!item.paymentMethod && PaymentMethod[item.paymentMethod]}
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
            <ActionGroup
              order={item}
              direction={'vertical'}
              onChange={onChange}
            />
          </Row>
        </div>
      ))}

      <Pagination {...page} onChange={onChange} />
    </>
  );
}
