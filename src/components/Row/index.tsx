import { HTMLAttributes } from 'react';

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  // 垂直对齐方式
  align?: 'top' | 'bottom' | 'middle';
  // 水平排列方式
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  // 是否自动换行
  wrap?: boolean;
}

const rowAlign = {
  top: 'flex-start',
  bottom: 'flex-end',
  middle: 'center'
};
const rowJustify = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly'
};

export default function Row({
  align = 'top',
  justify = 'start',
  wrap = true,
  style,
  ...props
}: RowProps) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        justifyContent: rowJustify[justify],
        alignItems: rowAlign[align],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...(style || {})
      }}
    />
  );
}
