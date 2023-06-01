import useElementVisible from '@/hooks/useElementVisible.ts';
import classNames from 'classnames';
import { useRef } from 'react';
import styles from '../index.module.less';

export default function Section5() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = useElementVisible(containerRef, (rect) => {
    return rect.top <= window.innerHeight;
  });

  return (
    <div ref={containerRef} style={{ backgroundColor: '#000' }}>
      <div
        className={classNames(
          styles.section,
          styles.section5,
          visible && styles.active
        )}
      >
        <div>
          黑色LOGO搭配黑圈相机DECO
          <br />
          机身色调更和谐
        </div>
        <img
          src={
            'https://cdn.cnbj1.fds.api.mi-img.com/product-images/xiaomi-13-Ulimited-edition1byfh9/16666.jpg?x-fds-process=image/resize,q_90'
          }
          alt={''}
          draggable={false}
          width={'100%'}
        />
      </div>
    </div>
  );
}
