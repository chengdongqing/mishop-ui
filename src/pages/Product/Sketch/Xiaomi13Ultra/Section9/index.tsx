import LazyImage from '@/components/LazyImage';
import styles from '../index.module.less';

export default function Section9() {
  return (
    <div className={styles.section9}>
      <LazyImage
        src={
          'https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-Ulimited-edition1byfh9/14533.png?x-fds-process=image/resize,q_90'
        }
        alt={''}
        width={'100%'}
      />
      <div className={styles.content}>
        <div className={styles.title}>全链路专业体验</div>
        <LazyImage
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-Ulimited-edition1byfh9/14535.png?x-fds-process=image/resize,q_90'
          }
          alt={''}
        />
      </div>
    </div>
  );
}
