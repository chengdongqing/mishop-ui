import { HTMLAttributes } from 'react';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  // 列数
  columns: number;
  // 间距
  gap?: string | number;
}

export default function Grid({
  columns,
  gap,
  style,
  className,
  ...rest
}: GridProps) {
  return (
    <div
      {...rest}
      style={{
        gap,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        ...(style || {})
      }}
      className={className}
    />
  );
}
