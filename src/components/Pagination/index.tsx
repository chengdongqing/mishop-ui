import Space from '@/components/Space';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './index.module.less';

interface PaginationProps {
  current?: number;
  pageSize?: number;
  total?: number;

  onChange?: (page: number) => void;
}

export default function Pagination({
  current = 1,
  pageSize = 10,
  total = 99,
  onChange
}: PaginationProps) {
  const pages = useMemo(() => {
    return total > 0 ? Math.ceil(total / pageSize) : 0;
  }, [pageSize, total]);

  const middlePages = useMemo(() => {
    return [45, 46, 47, 48];
  }, []);

  const hasPrev = useMemo(() => false, []);
  const hasNext = useMemo(() => true, []);

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        const { number } = (e.target as any).dataset;
        if (number) {
          console.log({ number });
        }
      }}
    >
      <Space size={'1rem'}>
        {/* 左箭头 */}
        <div
          className={classNames(styles.item, !hasPrev && styles.disabled)}
          data-number={current - 1}
        >
          <LeftOutlined />
        </div>

        {/* 第一页 */}
        <div
          className={classNames(styles.item, current === 1 && styles.active)}
          data-number={1}
        >
          1
        </div>

        {/* 左侧省略页 */}
        <div className={classNames(styles.item, styles.disabled)}>...</div>

        {/* 中间页 */}
        {middlePages.map((item) => (
          <div
            key={item}
            data-number={item}
            className={classNames(
              styles.item,
              current === item && styles.active
            )}
          >
            {item}
          </div>
        ))}

        {/* 右侧省略页 */}
        <div className={classNames(styles.item, styles.disabled)}>...</div>

        {/* 最后一页 */}
        <div
          className={classNames(
            styles.item,
            current === pages && styles.active
          )}
        >
          {pages}
        </div>

        {/* 右箭头 */}
        <div className={classNames(styles.item, !hasNext && styles.disabled)}>
          <RightOutlined />
        </div>
      </Space>
    </div>
  );
}
