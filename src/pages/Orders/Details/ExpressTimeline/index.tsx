import { OrderVO } from '@/services/order.ts';
import { LoginOutlined } from '@ant-design/icons';
import styles from './index.module.css';

export default function ExpressTimeline({ order }: {
  order: OrderVO
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        快递公司：
        <a href={'https://www.sf-express.com'} target={'_blank'}>
          {order.expressName}
          <LoginOutlined className={styles.icon} />
        </a>
        运单号：<span className={styles.waybill_no}>{order.trackingNumber}</span>
      </div>
      <div className={styles.timeline}>
        <div className={styles.time_node}>
          北京市：在官网"运单资料&签收图"，可查看签收人信息 2023-06-02 18:10:51
        </div>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <div key={index} className={styles.time_node}>
              北京市：快件已交接给顺丰合作点(京东照相馆，联系电话：18920222022)，合作点将与您联系派送或者自取，请保持电话畅通。
              <br />
              2023-06-01 12:52:08
            </div>
          ))}
      </div>
    </div>
  );
}
