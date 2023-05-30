import { PropsWithStyle } from '@/utils/typings';
import { PropsWithChildren } from 'react';

interface GridProps extends PropsWithChildren, PropsWithStyle {
  // 列数
  columns: number;
  // 间距
  gap?: string | number;
}

export default function Grid({
  children,
  columns,
  gap,
  style,
  className
}: GridProps) {
  return (
    <div
      style={{
        gap,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        ...(style || {})
      }}
      className={className}
    >
      {children}
    </div>
  );
}
