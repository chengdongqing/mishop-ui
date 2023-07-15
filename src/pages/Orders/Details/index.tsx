import Button from '@/components/Button';
import Grid from '@/components/Grid';
import Row from '@/components/Row';
import Space from '@/components/Space';
import UserLayout from '@/layouts/UserLayout';
import { orders } from '@/pages/Orders/Orders/const.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import { Link, useParams } from 'react-router-dom';
import ExpressTimeline from './ExpressTimeline';
import styles from './index.module.less';
import ProgressBar from './ProgressBar';

const OrderProgresses = [
  {
    step: 1,
    label: '下单',
    datetime: '2023-06-01 10:39:12'
  },
  {
    step: 2,
    label: '付款',
    datetime: '2023-06-01 10:42:12'
  },
  {
    step: 3,
    label: '配货',
    datetime: '2023-06-01 10:59:12'
  },
  {
    step: 4,
    label: '出库',
    datetime: '2023-06-01 13:21:12'
  },
  {
    step: 5,
    label: '交易成功'
  }
];

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orders[0];

  return (
    <>
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
          订单号：<span>{orderId}</span>
        </div>
        <Space size={'1rem'}>
          <Button outlined className={styles.btn}>
            联系客服
          </Button>
          <Button outlined className={styles.btn}>
            申请售后
          </Button>
        </Space>
      </Row>
      <div className={styles.order_status}>已发货</div>
      <ProgressBar value={4} options={OrderProgresses} />
      <ExpressTimeline />
      <div className={styles.product_list}>
        {order.products.map((item) => (
          <Row
            key={item.name}
            align={'middle'}
            className={styles.product_item}
          >
            <Link to={buildProductUrl(item.id)} target={'_blank'}>
              <img src={item.pictureUrl} alt={item.name} />
              <span className={styles.label}>{item.name}</span>
            </Link>
            <span>
              {formatAmount(item.price)} x {item.number}
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
          <span>{order.shippingInfo.username}</span>
        </div>
        <div>
          <span className={styles.label}>联系电话：</span>
          <span>{order.shippingInfo.phoneNumber}</span>
        </div>
        <div>
          <span className={styles.label}>收货地址：</span>
          <span>{order.shippingInfo.address.join(' ')}</span>
        </div>
      </div>
      <div className={styles.order_details}>
        <div className={styles.title}>支付方式</div>
        <div>
          <span className={styles.label}>支付方式：</span>
          <span>在线支付（{order.paymentMethod}）</span>
        </div>
      </div>
      <div className={styles.amount_info}>
        <Grid columns={2} gap={'0.8rem'} style={{ alignItems: 'end' }}>
          <span>商品总价：</span>
          <span className={styles.value}>
            {formatAmount(order.productsAmount)}
          </span>
          <span>优惠：</span>
          <span className={styles.value}>-{formatAmount(order.discount)}</span>
          <span>运费：</span>
          <span className={styles.value}>{formatAmount(order.expressFee)}</span>
          <span style={{ lineHeight: '3rem', marginTop: '2.5rem' }}>
            实付金额：
          </span>
          <span className={styles.value}>
            <span>{formatAmount(order.paymentAmount, '')}</span>元
          </span>
        </Grid>
      </div>
    </>
  );
}
