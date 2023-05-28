import Space from '@/components/Space';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './index.module.less';

interface PaginationProps {
  current?: number;
  pageSize?: number;
  totalSize?: number;

  onChange?(page: number): void;
}

const overPages = 7;

export default function Pagination({
  current = 1,
  pageSize = 10,
  totalSize = 0,
  onChange
}: PaginationProps) {
  const pages = useMemo(() => {
    return totalSize > 0 ? Math.ceil(totalSize / pageSize) : 0;
  }, [pageSize, totalSize]);

  const middlePages = useMemo(() => {
    if (pages <= overPages) {
      return [];
    }

    const items = [];
    if (current <= 3) {
      for (let i = 2; i <= 4; i++) {
        items.push(i);
      }
    } else if (current > pages - 3) {
      for (let i = pages - 4; i < pages; i++) {
        items.push(i);
      }
    } else {
      for (let i = current - 2; i <= current + 2; i++) {
        items.push(i);
      }
    }
    return items;
  }, [current, pages]);
  const hasPrevMore = useMemo(() => {
    return pages > overPages && current > 3;
  }, [current, pages]);
  const hasNextMore = useMemo(() => {
    return pages > overPages && current < pages - 3;
  }, [current, pages]);

  function handleChange(page: number) {
    if (page !== current) {
      onChange?.(page);
    }
  }

  return (
    <div className={styles.container}>
      <Space size={'1rem'}>
        {/* 左箭头 */}
        <div
          className={classNames(styles.item, current <= 1 && styles.disabled)}
          onClick={() => {
            if (current > 1) {
              handleChange(current - 1);
            }
          }}
        >
          <LeftOutlined />
        </div>

        {/* 第一页 */}
        <div
          className={classNames(styles.item, current === 1 && styles.active)}
          onClick={() => {
            handleChange(1);
          }}
        >
          1
        </div>

        {/* 左侧省略页 */}
        {hasPrevMore && (
          <div className={classNames(styles.item, styles.disabled)}>...</div>
        )}

        {/* 中间页 */}
        {middlePages.map((item) => (
          <div
            key={item}
            className={classNames(
              styles.item,
              current === item && styles.active
            )}
            onClick={() => {
              handleChange(item);
            }}
          >
            {item}
          </div>
        ))}

        {/* 右侧省略页 */}
        {hasNextMore && (
          <div className={classNames(styles.item, styles.disabled)}>...</div>
        )}

        {/* 最后一页 */}
        <div
          className={classNames(
            styles.item,
            current === pages && styles.active
          )}
          onClick={() => {
            handleChange(pages);
          }}
        >
          {pages}
        </div>

        {/* 右箭头 */}
        <div
          className={classNames(
            styles.item,
            current >= pages && styles.disabled
          )}
          onClick={() => {
            if (current < pages) {
              handleChange(current + 1);
            }
          }}
        >
          <RightOutlined />
        </div>
      </Space>
    </div>
  );
}
