import Button from '@/components/Button';
import Row from '@/components/Row';
import Space from '@/components/Space';
import UserLayout from '@/layouts/UserLayout';
import { orders } from '@/pages/Orders/Orders/const.ts';
import { formatAmount } from '@/utils';
import { DefaultDateTimeFormat } from '@/utils/constants.ts';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function OrderCommentsPage() {
  return (
    <>
      <UserLayout.Header title={'订单评价'} />
      <div className={styles.container}>
        {orders.map((item) => (
          <div key={item.id} className={styles.order_item}>
            <Row
              align={'middle'}
              justify={'space-between'}
              className={styles.header}
            >
              <Space size={'1.6rem'}>
                <span>
                  下单时间：
                  {moment(item.createTime).format(DefaultDateTimeFormat)}
                </span>
                <span>订单号：{item.id}</span>
              </Space>
              <span>
                实付金额：
                <span className={styles.amount}>
                  {formatAmount(item.paymentAmount, '')}
                </span>
                元
              </span>
            </Row>
            <Row
              align={'middle'}
              justify={'space-between'}
              className={styles.main}
            >
              <Space>
                {item.products.slice(0, 6).map((item) => (
                  <img
                    key={item.name}
                    alt={item.name}
                    src={item.pictureUrl}
                  />
                ))}
                <span className={styles.counter}>
                  共{item.products.length}种商品
                </span>
              </Space>
              <Space direction={'vertical'}>
                <Link
                  target={'_blank'}
                  to={`/orders/${item.id}`}
                  className={styles.link}
                >
                  订单详情
                </Link>
                <Link to={`/orders/comments/${item.id}`}>
                  <Button className={styles.btn}>去评价</Button>
                </Link>
              </Space>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
}
