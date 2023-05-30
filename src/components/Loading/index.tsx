import useMount from '@/hooks/useMount.ts';
import { PropsWithStyle } from '@/utils/typings';
import classNames from 'classnames';
import { CSSProperties, useState } from 'react';
import styles from './index.module.less';

interface LoadingProps extends PropsWithStyle {
  // 效果类型
  type?: 'wave' | 'circle' | 'dashed' | 'dot';
  // 颜色
  color?: string;
  // 动画时长
  duration?: number;
  // 延迟多久显示
  delay?: number;
  // 提示内容
  tip?: string;
  // 提示是否换行
  warp?: boolean;
}

export default function Loading({
  type = 'wave',
  color = '#ff6700',
  duration = 1,
  delay = 0,
  tip,
  warp = false,
  style = {},
  className
}: LoadingProps) {
  const [visible, setVisible] = useState(false);
  useMount(() => {
    setTimeout(() => {
      setVisible(true);
    }, delay);
  });

  return visible ? (
    <div
      className={classNames(styles.container, warp && styles.wrap, className)}
      style={
        {
          '--color': color,
          '--duration': `${duration}s`,
          ...style
        } as CSSProperties
      }
    >
      {/* 波动动画 */}
      {type === 'wave' && (
        <div className={classNames(styles.loading, styles.wave)}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <span key={index} className={styles.icon} />
            ))}
        </div>
      )}

      {/* 圆圈旋转动画 */}
      {type === 'circle' && (
        <div className={classNames(styles.loading, styles.circle)}>
          <i className={styles.icon} />
        </div>
      )}

      {/* 虚线旋转动画 */}
      {type === 'dashed' && (
        <div className={classNames(styles.loading, styles.dashed)}>
          <i className={styles.icon} />
        </div>
      )}

      {/* 跳动圆点 */}
      {type === 'dot' && (
        <div className={classNames(styles.loading, styles.dot)}>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <span key={index} className={styles.icon} />
            ))}
        </div>
      )}

      {/* 提示文字 */}
      {!!tip && <span className={styles.tip}>{tip}</span>}
    </div>
  ) : null;
}
