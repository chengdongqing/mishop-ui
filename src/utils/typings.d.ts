import { CSSProperties } from 'react';

/**
 * 通用样式相关属性
 */
declare type PropsWithStyle<P = unknown> = P & {
  style?: CSSProperties;
  className?: string;
};
