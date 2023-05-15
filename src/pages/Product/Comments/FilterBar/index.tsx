import Space from '@/components/Space';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './index.module.less';

const options = [
  {
    label: '价格实惠',
    number: 636
  },
  {
    label: '亮度可调',
    number: 547
  },
  {
    label: '颜值够高',
    number: 488
  },
  {
    label: '光线柔和',
    number: 453
  },
  {
    label: '质量上乘',
    number: 388
  },
  {
    label: '全部'
  }
];

export default function FilterBar({
  onChange
}: {
  onChange: (value: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.title}>大家认为</div>

      <div className={styles.categories}>
        <Space size={'2.4rem'}>
          {options.map((item, index) => (
            <div
              key={item.label}
              className={classNames(
                styles.category_item,
                index === current && styles.active
              )}
              onClick={() => {
                setCurrent(index);
                onChange(index);
              }}
            >
              {item.label} {!!item.number && `（${item.number}）`}
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
}
