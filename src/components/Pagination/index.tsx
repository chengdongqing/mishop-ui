import Space from '@/components/Space';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo } from 'react';
import styles from './index.module.css';

interface PaginationProps {
  pageNumber?: number;
  pageSize?: number;
  totalSize?: number;

  onChange?(page: number): void;
}

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
    if (pages <= 2) {
      return [];
    }

    let startPage = pageNumber - 2;
    let endPage = pageNumber + 2;

    if (startPage <= 1) {
      endPage -= (startPage - 2);
      startPage = 2;
    }
    if (endPage >= pages) {
      startPage -= (endPage - pages + 1);
      endPage = pages - 1;
    }

    startPage = Math.max(startPage, 2);
    endPage = Math.min(endPage, pages - 1);

    const items = [];
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }
    return items;
  }, [pageNumber, pages]);

  const hasPrevMore = useMemo(() => {
    return middlePages.length > 0 && middlePages[0] > 2;
  }, [middlePages]);

  const hasNextMore = useMemo(() => {
    return middlePages.length > 0 && middlePages[middlePages.length - 1] < pages - 1;
  }, [middlePages, pages]);


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
