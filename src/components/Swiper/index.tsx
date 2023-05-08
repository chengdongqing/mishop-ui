import useSwiper from '@/components/Swiper/useSwiper.ts';
import { PropsWithStyle } from '@/utils/declare';
import classNames from 'classnames';
import {
  Children,
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle
} from 'react';
import styles from './index.module.less';

export interface SwiperProps extends PropsWithChildren, PropsWithStyle {
  // 自动切换
  autoplay?: boolean;
  // 动画效果
  animation?: 'scrollX' | 'scrollY' | 'fade';
  // 动画方向
  direction?: 'forward' | 'reverse';
  // 动画时长
  duration?: number;
  // 切换间隔
  interval?: number;
  // 是否显示指示点
  indicatorDots?: boolean;

  // 切换后
  afterChange?: (current?: number) => void;
  // 切换前
  beforeChange?: (current: number, next: number) => void;
}

export interface SwiperHandle {
  next: () => void;
  prev: () => void;
  to: (index: number) => void;
}

const Swiper = forwardRef<SwiperHandle, SwiperProps>(
  (
    {
      children,
      autoplay = true,
      animation = 'scrollX',
      direction: direction1 = 'forward',
      duration = 800,
      interval = 3000,
      indicatorDots = true,
      style,
      className,
      afterChange,
      beforeChange
    },
    forwardedRef
  ) => {
    const [
      { activeIndex, prevIndex, nextIndex, direction, timer, length },
      { switchIndex, startPlay }
    ] = useSwiper({
      direction: direction1,
      children,
      autoplay,
      interval,
      afterChange,
      beforeChange
    });

    function toIndex(index: number) {
      startPlay();
      switchIndex(true, index);
    }

    useImperativeHandle(forwardedRef, () => ({
      next() {
        startPlay();
        switchIndex();
      },
      prev() {
        startPlay();
        switchIndex(false);
      },
      to: toIndex
    }));

    return (
      <div
        style={
          { ...(style || {}), '--duration': `${duration}ms` } as CSSProperties
        }
        className={classNames(styles.container, className)}
        onMouseEnter={() => {
          clearInterval(timer.current);
        }}
        onMouseLeave={startPlay}
      >
        {Children.map(children, (child, index) => (
          <div
            className={classNames(
              styles.swiper_item,
              styles[animation],
              styles[direction as string],
              index === activeIndex && styles.active,
              prevIndex === index && styles.prev,
              nextIndex === index && styles.next
            )}
          >
            {child}
          </div>
        ))}

        {indicatorDots && (
          <IndicatorDots
            length={length}
            current={activeIndex}
            onChange={toIndex}
          />
        )}
      </div>
    );
  }
);

function IndicatorDots({
  length,
  current,
  onChange
}: {
  length: number;
  current: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className={styles.indicator_dots}>
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className={classNames(
              styles.dot_item,
              index === current && styles.active
            )}
            onClick={() => {
              onChange(index);
            }}
          />
        ))}
    </div>
  );
}

export default Swiper;
