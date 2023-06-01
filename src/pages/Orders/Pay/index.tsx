import MiniHeader from '@/components/MiniHeader';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useToggle from '@/hooks/useToggle.ts';
import { useCartCounter } from '@/pages/Cart/MainCart/helpers.ts';
import { addresses } from '@/pages/Orders/Checkout/const.ts';
import { useCartProducts } from '@/store/slices/cartSlice.ts';
import { displayAmount } from '@/utils';
import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './index.module.less';

export default function PayPage() {
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
          <OrderInfos />
          <PaymentMethods />
        </div>
      </div>
    </>
  );
}

function OrderInfos() {
  const address = useMemo(() => addresses[0], []);
  const products = useCartProducts(true);
  const { totalAmount } = useCartCounter(true);
  const [open, toggleOpen] = useToggle(false);
  const height = useMemo(() => {
    return open ? `${11.7 + 2.4 * (products.length - 1)}rem` : 0;
  }, [open, products.length]);

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
              请在 <span>1 小时 59 分</span> 内完成支付, 超时后将取消订单
            </div>
            <div className={styles.tips} hidden={open}>
              收货信息：
              {[
                address.username,
                address.phoneNumber,
                address.address.join(' ')
              ].join(' ')}
            </div>
          </div>
          <div className={styles.right}>
            <div style={{ marginBottom: '1rem' }}>
              应付金额：
              <span className={styles.amount}>
                <span>{displayAmount(totalAmount, '')}</span>元
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
              <div className={styles.order_number}>5230601985602776</div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>收货信息：</div>
              <div>
                {[
                  address.username,
                  address.phoneNumber,
                  address.address.join(' ')
                ].join(' ')}
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>商品名称：</div>
              <div>
                {products.map((item) => (
                  <div key={item.label}>
                    {item.label}{' '}
                    <span style={{ color: '#b0b0b0' }}>x {item.number}</span>
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

const methods = [
  {
    label: '支付宝',
    icon: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/031f3af10e3856352b847fe480b2b2e5.png'
  },
  {
    label: '小米钱包',
    icon: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/60ca2cd19969cfbfa9a5507ab80ab620.png'
  },
  {
    label: '微信',
    icon: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4cdfb179cdce8f95c57e8d82c469d20c.png'
  }
];

function PaymentMethods() {
  return (
    <div className={classNames(styles.card, styles.payment_methods)}>
      <div className={styles.title}>选择以下支付方式付款</div>
      <Space size={'1.4rem'}>
        {methods.map((item) => (
          <div
            key={item.label}
            className={styles.method_item}
            onClick={() => {
              popup.open({
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
                )
              });
            }}
          >
            <img src={item.icon} alt={item.label} />
          </div>
        ))}
      </Space>
    </div>
  );
}
