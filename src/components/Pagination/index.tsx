import Space from '@/components/Space';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './index.module.less';

interface PaginationProps {
  pageNumber?: number;
  pageSize?: number;
  totalSize?: number;

  onChange?(page: number): void;
}

const overPages = 7;

export default function Pagination({
  pageNumber = 1,
  pageSize = 10,
  totalSize = 10,
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
    if (pageNumber <= 3) {
      for (let i = 2; i <= 4; i++) {
        items.push(i);
      }
    } else if (pageNumber > pages - 3) {
      for (let i = pages - 4; i < pages; i++) {
        items.push(i);
      }
    } else {
      for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
        items.push(i);
      }
    }
    return items;
  }, [pageNumber, pages]);
  const hasPrevMore = useMemo(() => {
    return pages > overPages && pageNumber > 3;
  }, [pageNumber, pages]);
  const hasNextMore = useMemo(() => {
    return pages > overPages && pageNumber < pages - 3;
  }, [pageNumber, pages]);

  function handleChange(page: number) {
    if (page !== pageNumber) {
      onChange?.(page);
    }
  }

  return (
    <div className={styles.container}>
      <Space size={'1rem'}>
        {/* 左箭头 */}
        <div
          className={classNames(styles.item, pageNumber <= 1 && styles.disabled)}
          onClick={() => {
            if (pageNumber > 1) {
              handleChange(pageNumber - 1);
            }
          }}
        >
          <LeftOutlined />
        </div>

        {/* 第一页 */}
        <div
          className={classNames(styles.item, pageNumber === 1 && styles.active)}
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
              pageNumber === item && styles.active
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
        {pages > 1 && (
          <div
            className={classNames(
              styles.item,
              pageNumber === pages && styles.active
            )}
            onClick={() => {
              handleChange(pages);
            }}
          >
            {pages}
          </div>
        )}

        {/* 右箭头 */}
        <div
          className={classNames(
            styles.item,
            pageNumber >= pages && styles.disabled
          )}
          onClick={() => {
            if (pageNumber < pages) {
              handleChange(pageNumber + 1);
            }
          }}
        >
          <RightOutlined />
        </div>
      </Space>
    </div>
  );
}
