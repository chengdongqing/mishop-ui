import Button from '@/components/Button';
import DataContainer from '@/components/DataContainer';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { DefaultDateTimeFormat } from '@/consts';
import useRequest from '@/hooks/useRequest.ts';
import UserLayout from '@/layouts/UserLayout';
import { fetchPendingReviewOrders } from '@/services/orderReview.ts';
import { formatAmount } from '@/utils';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function OrderReviewsPage() {
  const { data: orders, loading } = useRequest(fetchPendingReviewOrders);

  return (
    <>
      <UserLayout.Header title={'订单评价'} />
      <div className={styles.container}>
        <DataContainer loading={loading} empty={!orders?.length && '暂无数据'}>
          {orders?.map((item) => (
            <div key={item.orderId} className={styles.order_item}>
              <Row
                align={'middle'}
                justify={'space-between'}
                className={styles.header}
              >
                <Space size={'1.6rem'}>
                  <span>
                    下单时间：
                    {moment(item.orderAt).format(DefaultDateTimeFormat)}
                  </span>
                  <span>订单号：{item.orderNumber}</span>
                </Space>
                <span>
                  实付金额：
                  <span className={styles.amount}>
                    {formatAmount(item.paidAmount, '')}
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
                  {item.items.slice(0, 6).map((item) => (
                    <img
                      key={item.skuId}
                      alt={item.productName}
                      src={item.pictureUrl}
                    />
                  ))}
                  <span className={styles.counter}>
                    共{item.items.length}种商品
                  </span>
                </Space>
                <Space direction={'vertical'}>
                  <Link
                    className={styles.link}
                    to={`/orders/${item.orderId}`}
                    target={'_blank'}
                  >
                    订单详情
                  </Link>
                  <Link to={`/orders/reviews/${item.orderId}`}>
                    <Button className={styles.btn}>去评价</Button>
                  </Link>
                </Space>
              </Row>
            </div>
          ))}
        </DataContainer>
      </div>
    </>
  );
}
