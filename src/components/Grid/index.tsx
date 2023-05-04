import { CSSProperties, PropsWithChildren } from 'react';

interface GridProps extends PropsWithChildren {
  // 列数
  columns: number;
  // 间距
  gap?: string | number;

  style?: CSSProperties;
  className?: string;
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
