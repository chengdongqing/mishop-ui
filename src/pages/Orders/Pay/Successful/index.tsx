import Button from '@/components/Button';
import RecommendedProducts from '@/components/RecommendedProducts';
import Row from '@/components/Row';
import { useCartCounter } from '@/pages/Cart/ShoppingCart/helpers.ts';
import { addresses } from '@/pages/User/Addresses/const.ts';
import { useCartItems } from '@/store/slices/cartSlice.ts';
import { formatAmount } from '@/utils';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function PaySuccessfulPage() {
  const products = useCartItems(true);
  const { totalAmount } = useCartCounter(true);
  const address = useMemo(() => addresses[0], []);

  return (
    <div
      style={{
        padding: '3.8rem 0',
        backgroundColor: 'var(--color-background)'
      }}
    >
      <Row className={styles.container}>
        <div className={styles.success_cover}>
          <div className={styles.title}>支付成功</div>
          <div className={styles.amount}>
            <span>{formatAmount(totalAmount, '')}</span>元
          </div>
          <Link to={'/orders/5230601985602776'}>
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
            <div>5230601985602776</div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>收货信息：</div>
            <div>
              {address.username} {address.phoneNumber}
              <br />
              {address.address.join(' ')}
              <br />
              <span className={styles.tips}>
                * 在“订单详情页”你可以确认收货地址或者更改收货地址
              </span>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.label}>商品名称：</div>
            <div>
              {products.map((item) => (
                <div key={item.skuId}>
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
      </Row>

      <RecommendedProducts title={'为你推荐'} mode={'swiper'} />
    </div>
  );
}
