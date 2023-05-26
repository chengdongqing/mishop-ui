import Space from '@/components/Space';
import Swiper, { SwiperHandle } from '@/components/Swiper';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import styles from './index.module.less';

export default function ProductSwiper({ pictures }: { pictures: string[] }) {
  const swiperRef = useRef<SwiperHandle>(null);
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.container}>
      <Swiper
        ref={swiperRef}
        animation={'fade'}
        indicatorDots={false}
        afterChange={setCurrent}
        className={styles.swiper}
      >
        {pictures.map((item) => (
          <img
            alt={''}
            key={item}
            src={item}
            width={'100%'}
            height={'100%'}
            draggable={false}
          />
        ))}
      </Swiper>
      <div
        className={classNames(styles.btn, styles.left)}
        onClick={() => {
          swiperRef.current?.prev();
        }}
      >
        <LeftOutlined />
      </div>
      <div
        className={classNames(styles.btn, styles.right)}
        onClick={() => {
          swiperRef.current?.next();
        }}
      >
        <RightOutlined />
      </div>
      <div className={styles.swiper_dots}>
        <Space>
          {pictures.map((item, index) => (
            <div
              key={item}
              className={classNames(
                styles.dot_item,
                index === current && styles.active
              )}
              onClick={() => {
                swiperRef.current?.to(index);
              }}
            />
          ))}
        </Space>
      </div>
    </div>
  );
}
