import DataContainer from '@/components/DataContainer';
import MiniHeader from '@/components/MiniHeader';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import useCountdown from '@/hooks/useCountdown.ts';
import useRequest from '@/hooks/useRequest.ts';
import useToggle from '@/hooks/useToggle.ts';
import { fetchOrderInfo, OrderVO, requestPayment } from '@/services/order.ts';
import { formatAmount, formatTime } from '@/utils';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import moment from 'moment';
import { useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './index.module.less';

export default function PayPage() {
  const params = useParams<{
    id: string;
  }>();
  const orderId = Number(params.id);
  const { data, loading } = useRequest(() => fetchOrderInfo(orderId));

  return (
    <>
      <MiniHeader title={'支付订单'} />
      <div
        style={{
          padding: '3.8rem 0',
          backgroundColor: 'var(--color-background)'
        }}
      >
        <div className={styles.container}>
          <DataContainer loading={loading}>
            <OrderInfos order={data} />
            <PaymentMethods orderId={orderId} />
          </DataContainer>
        </div>
      </div>
    </>
  );
}

function OrderInfos({ order }: { order: OrderVO | null }) {
  const [open, toggleOpen] = useToggle(false);
  const height = useMemo(() => {
    return open && order?.items
      ? `${11.7 + 2.4 * (order?.items.length - 1)}rem`
      : 0;
  }, [open, order?.items]);

  const navigate = useNavigate();
  const seconds = useMemo(() => {
    if (order) {
      return moment(order.createdAt).add(2, 'hours').diff(moment(), 'seconds');
    }
    return 0;
  }, [order]);
  const [remaining] = useCountdown(seconds, false, () => {
    setTimeout(() => {
      popup.alert('支付超时，订单已取消', () => {
        navigate('/orders', {
          replace: true
        });
      });
    }, 500);
  });

  return (
    <div className={classNames(styles.card, styles.order_infos)}>
      <div className={styles.successful_icon}>
        <CheckOutlined />
      </div>
      <div className={styles.content}>
        <Row justify={'space-between'} style={{ padding: '2rem 0' }}>
          <div>
            <div className={styles.title}>订单提交成功！去付款咯～</div>
            <div className={styles.tips}>
              请在 <span>{formatTime(remaining)}</span> 内完成支付,
              超时后将取消订单
            </div>
            <div className={styles.tips} hidden={open}>
              收货信息：
              {order?.recipientAddress}
            </div>
          </div>
          <div className={styles.right}>
            <div style={{ marginBottom: '1rem' }}>
              应付金额：
              <span className={styles.amount}>
                <span>{formatAmount(order?.paidAmount, '')}</span>元
              </span>
            </div>
            <div className={styles.btn_more} onClick={toggleOpen}>
              订单详情{' '}
              <DownOutlined
                className={classNames(styles.icon, open && styles.active)}
              />
            </div>
          </div>
        </Row>
        <div className={styles.details_wrapper} style={{ height }}>
          <div className={styles.details}>
            <div className={styles.item}>
              <div className={styles.label}>订单号：</div>
              <div className={styles.order_number}>{order?.orderNumber}</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>收货信息：</div>
              <div>{order?.recipientAddress}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

interface PaymentMethod {
  label: string;
  code: string;
  icon: string;
}

const methods: PaymentMethod[] = [
  {
    label: '支付宝',
    code: 'ALIPAY',
    icon: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/031f3af10e3856352b847fe480b2b2e5.png'
  },
  {
    label: '微信',
    code: 'WECHAT',
    icon: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4cdfb179cdce8f95c57e8d82c469d20c.png'
  }
];

function PaymentMethods({ orderId }: { orderId: number }) {
  const timer = useRef<NodeJS.Timer>();
  const navigate = useNavigate();

  async function handlePayment(item: PaymentMethod) {
    const closeLoading = toast.loading('请求支付中...');
    const url = await requestPayment(orderId, item.code);
    console.log({ url });
    closeLoading();

    const close = popup.open({
      title: `${item.label}支付`,
      width: '37rem',
      footer: null,
      content: (
        <div className={styles.payment_qrcode}>
          <img
            src={
              'https://i.huodong.mi.com/qrcode/wxget?code=weixin%3A%2F%2Fwxpay%2Fbizpayurl%3Fpr%3D3X3F5Efzz&key=3361d67c9d7664f3a5749925c9ce1c25'
            }
            alt={'qrcode'}
            className={styles.qrcode}
          />
          <div className={styles.tips}>
            请使用 <span>{item.label}</span> 扫一扫
            <br />
            二维码完成支付
          </div>
        </div>
      ),
      onCancel() {
        clearTimeout(timer.current);
      }
    });

    timer.current = setTimeout(() => {
      close();
      navigate('successfully', {
        replace: true
      });
    }, 3000);
  }

  return (
    <div className={classNames(styles.card, styles.payment_methods)}>
      <div className={styles.title}>选择以下支付方式付款</div>
      <Space size={'1.4rem'}>
        {methods.map((item) => (
          <div
            key={item.label}
            className={styles.method_item}
            onClick={() => handlePayment(item)}
          >
            <img src={item.icon} alt={item.label} />
          </div>
        ))}
      </Space>
    </div>
  );
}
