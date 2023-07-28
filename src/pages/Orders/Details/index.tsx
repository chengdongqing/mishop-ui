import DataContainer from '@/components/DataContainer';
import Grid from '@/components/Grid';
import Row from '@/components/Row';
import useRequest from '@/hooks/useRequest.ts';
import UserLayout from '@/layouts/UserLayout';
import ActionGroup from '@/pages/Orders/components/ActionGroup';
import { OrderStatus, PaymentMethod } from '@/pages/Orders/enums.ts';
import { fetchOrderEvents, fetchOrderInfo } from '@/services/order.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ExpressTimeline from './ExpressTimeline';
import styles from './index.module.less';
import ProgressBar from './ProgressBar';

const OrderProgressOptions = [
  {
    step: 1,
    label: '下单',
    statusCode: 'PENDING_PAYMENT',
    timeCode: 'orderAt'
  },
  {
    step: 2,
    label: '付款',
    statusCode: 'PENDING_PACKING',
    timeCode: 'paymentAt'
  },
  {
    step: 3,
    label: '配货',
    statusCode: 'PENDING_SHIPPING',
    timeCode: 'packingAt'
  },
  {
    step: 4,
    label: '出库',
    statusCode: 'PENDING_RECEIVING',
    timeCode: 'shippedAt'
  },
  {
    step: 5,
    label: '交易成功',
    statusCode: 'COMPLETED',
    timeCode: 'completedAt'
  }
];

export default function OrderDetailsPage() {
  const params = useParams<{
    orderId: string;
  }>();
  const orderId = Number(params.orderId);
  // 订单信息
  const {
    data: order,
    loading,
    run: refresh
  } = useRequest(() => fetchOrderInfo(orderId));

  // 事件信息
  const { data: events } = useRequest(() => fetchOrderEvents(orderId));
  const eventOptions = useMemo(() => {
    return OrderProgressOptions.map((item) => ({
      ...item,
      datetime: events?.[item.timeCode] as string
    }));
  }, [events]);
  const progressStep = useMemo(() => {
    return (
      OrderProgressOptions.findIndex((item) => {
        return item.statusCode === order?.status;
      }) + 1
    );
  }, [order?.status]);

  return (
    <DataContainer loading={loading} empty={!order && '订单加载失败'}>
      <UserLayout.Header
        title={'订单详情'}
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
      <Row justify={'space-between'} align={'middle'} className={styles.header}>
        <div className={styles.order_id}>
          订单号：<span>{order?.orderNumber}</span>
        </div>
        {!!order && <ActionGroup order={order} onChange={refresh} />}
      </Row>
      {!!order && (
        <div
          className={classNames(
            styles.order_status,
            !['PENDING_PAYMENT', 'CANCELED'].includes(order.status) &&
              styles.active
          )}
        >
          {OrderStatus[order?.status]}
        </div>
      )}
      <ProgressBar value={progressStep} options={eventOptions} />
      {!!order?.expressName && <ExpressTimeline order={order} />}
      <div className={styles.product_list}>
        {order?.items.map((item) => (
          <Row key={item.id} align={'middle'} className={styles.product_item}>
            <Link to={buildProductUrl(item.productId)} target={'_blank'}>
              <img src={item.pictureUrl} alt={item.productName} />
              <span className={styles.label}>
                {item.productName} {item.skuName}
              </span>
            </Link>
            <span>
              {formatAmount(item.unitPrice)} x {item.quantity}
            </span>
          </Row>
        ))}
      </div>
      <div className={styles.order_details}>
        <div className={styles.title}>收货信息</div>
        <div>
          <span className={styles.label}>
            姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
          </span>
          <span>{order?.recipientName}</span>
        </div>
        <div>
          <span className={styles.label}>联系电话：</span>
          <span>{order?.recipientPhone}</span>
        </div>
        <div>
          <span className={styles.label}>收货地址：</span>
          <span>{order?.recipientAddress}</span>
        </div>
      </div>
      {!!order?.paymentMethod && (
        <div className={styles.order_details}>
          <div className={styles.title}>支付方式</div>
          <div>
            <span className={styles.label}>支付方式：</span>
            <span>在线支付（{PaymentMethod[order?.paymentMethod]}）</span>
          </div>
        </div>
      )}
      <div className={styles.amount_info}>
        <Grid columns={2} gap={'0.8rem'} style={{ alignItems: 'end' }}>
          <span>商品总价：</span>
          <span className={styles.value}>
            {formatAmount(order?.productAmount)}
          </span>
          <span>优惠：</span>
          <span className={styles.value}>
            -{formatAmount(order?.discountAmount)}
          </span>
          <span>运费：</span>
          <span className={styles.value}>
            {formatAmount(order?.shippingFee)}
          </span>
          <span style={{ lineHeight: '3rem', marginTop: '2.5rem' }}>
            实付金额：
          </span>
          <span className={styles.value}>
            <span>{formatAmount(order?.paidAmount, '')}</span>元
          </span>
        </Grid>
      </div>
    </DataContainer>
  );
}
