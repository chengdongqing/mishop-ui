import LazyImage from '@/components/LazyImage';
import classNames from 'classnames';
import { useRef } from 'react';
import styles from '../index.module.less';
import useVisible from '../useVisible.ts';

export default function Section7() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useVisible(containerRef);

  return (
    <div ref={containerRef} style={{ backgroundColor: '#000' }}>
      <div
        className={classNames(
          styles.section,
          styles.section7,
          visible && styles.active
        )}
      >
        <LazyImage
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-Ulimited-edition1byfh9/2921.jpg?x-fds-process=image/resize,q_90'
          }
          alt={''}
          width={'100%'}
        />
        <div className={styles.content}>
          <div className={styles.badge}>Camera</div>
          <div className={styles.slogan}>
            忘情一刻
            <br />
            徕卡光学
          </div>
          <LazyImage
            src={
              'https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-Ulimited-edition1byfh9/1226.png?x-fds-process=image/resize,q_90'
            }
            alt={''}
          />
        </div>
      </div>
    </div>
  );
}
