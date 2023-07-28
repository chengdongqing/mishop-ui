import Button from '@/components/Button';
import DataContainer from '@/components/DataContainer';
import RecommendedProducts from '@/components/RecommendedProducts';
import Row from '@/components/Row';
import useRequest from '@/hooks/useRequest.ts';
import { fetchOrderInfo } from '@/services/order.ts';
import { formatAmount } from '@/utils';
import { Link, useParams } from 'react-router-dom';
import styles from './index.module.less';

export default function PaySuccessfullyPage() {
  const params = useParams<{
    id: string;
  }>();
  const orderId = Number(params.id);
  const { data: order, loading } = useRequest(() => fetchOrderInfo(orderId));

  return (
    <div
      style={{
        padding: '3.8rem 0',
        backgroundColor: 'var(--color-background)'
      }}
    >
      <Row className={styles.container}>
        <DataContainer loading={loading}>
          <div className={styles.success_cover}>
            <div className={styles.title}>支付成功</div>
            <div className={styles.amount}>
              <span>{formatAmount(order?.paidAmount, '')}</span>元
            </div>
            <Link to={`/orders/${orderId}`}>
              <Button outlined className={styles.btn}>
                查看订单详情
              </Button>
            </Link>
            <div className={styles.tips}>
              小米公司不会以任何理由要求您提供银行卡信息或支付额外费用
              <br />
              请谨防钓鱼链接或诈骗电话。
              <a
                href={'https://www.mi.com/service/help_center/fraud/'}
                target={'_blank'}
              >
                了解详情{'>'}
              </a>
            </div>
          </div>
          <div className={styles.order_infos}>
            <div className={styles.item}>
              <div className={styles.label}>订单编号：</div>
              <div>{order?.orderNumber}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>收货信息：</div>
              <div>
                {order?.recipientName} {order?.recipientPhone}
                <br />
                {order?.recipientAddress}
                <br />
                <span className={styles.tips}>
                * 在“订单详情页”你可以确认收货地址或者更改收货地址
              </span>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>商品名称：</div>
              <div>
                {order?.items.map((item) => (
                  <div key={item.id}>
                    {item.productName} {item.skuName}
                    <span style={{ color: '#b0b0b0' }}> x {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.app_qrcode}>
              <img
                alt={'app qrcode'}
                src={'https://c1.mifile.cn/f/i/15/pay/app-code.png'}
                className={styles.qrcode}
              />
              <div>
                通过小米商城app
                <br />
                随时跟踪订单
              </div>
            </div>
          </div>
        </DataContainer>
      </Row>

      <RecommendedProducts title={'为你推荐'} mode={'swiper'} />
    </div>
  );
}
