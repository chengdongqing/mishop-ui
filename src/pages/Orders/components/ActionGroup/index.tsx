import Button from '@/components/Button';
import popup from '@/components/Popup';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import { cancelOrder, OrderVO } from '@/services/order.ts';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function ActionGroup({
  order,
  direction,
  onChange
}: {
  order: OrderVO;
  direction?: 'horizontal' | 'vertical';
  onChange(): void;
}) {
  return (
    <Space direction={direction} size={'1rem'}>
      {direction === 'vertical' && (
        <Link to={`/orders/${order.id}`}>
          <Button outlined className={classNames(styles.btn, styles.gray)}>
            订单详情
          </Button>
        </Link>
      )}
      {order.status === 'PENDING_PAYMENT' && (
        <Link to={`/orders/pay/${order.id}`}>
          <Button outlined className={styles.btn}>
            去付款
          </Button>
        </Link>
      )}
      {order.status === 'COMPLETED' && !order.isReviewed && (
        <Link to={`/orders/reviews/${order.id}`}>
          <Button outlined className={styles.btn}>
            评价晒单
          </Button>
        </Link>
      )}
      {[
        'PENDING_PAYMENT',
        'PENDING_PACKING',
        'PENDING_SHIPPING',
        'PENDING_DELIVERY'
      ].includes(order.status) && (
        <Button
          outlined
          className={classNames(styles.btn, styles.gray)}
          onClick={() => {
            popup.confirm('确定取消订单吗？', {
              onOk() {
                cancelOrder(order.id).then(() => {
                  toast.success('订单取消成功');
                  onChange();
                });
              }
            });
          }}
        >
          取消订单
        </Button>
      )}
    </Space>
  );
}
