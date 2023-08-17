import Space from '@/components/Space';
import Swiper, { SwiperRef } from '@/components/Swiper';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

export default function ProductGallery({ pictures }: {
  pictures: string[]
}) {
  const swiperRef = useRef<SwiperRef>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
    swiperRef.current?.to(0);
  }, [pictures.length]);

  return (
    <div className={styles.container}>
      <Swiper
        ref={swiperRef}
        animation={'fade'}
        indicatorDots={false}
        afterChange={setCurrent}
        className={styles.swiper}
        autoplay={pictures.length > 1}
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

      {pictures.length > 1 && (
        <>
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
        </>
      )}
    </div>
  );
}
