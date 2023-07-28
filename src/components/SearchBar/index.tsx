import Row from '@/components/Row';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './index.module.less';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  keywords?: string[];
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;

  onSearch?(value: string): void;

  onChange?(value: string): void;
}

export default function SearchBar({
  value = '',
  placeholder,
  keywords,
  width,
  height,
  fontSize,
  onSearch,
  onChange
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [keyword, setKeyword] = useState(value);

  useUpdateEffect(() => {
    if (keywords) {
      setKeyword(keywords[activeIndex] || '');
    }
  }, [activeIndex]);

  function handleSearch() {
    onSearch?.(keyword);
  }

  return (
    <div className={classNames(styles.container, focused && styles.focused)}>
      <Row>
        <input
          value={keyword}
          className={styles.input}
          placeholder={placeholder}
          style={{ width, height, fontSize }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocused(false);
              setActiveIndex(-1);
            }, 200);
          }}
          onChange={(e) => {
            const { value } = e.target;
            setKeyword(value);
            onChange?.(value);
          }}
          onKeyDown={(e) => {
            if (keywords?.length) {
              if (e.key === 'ArrowUp') {
                setActiveIndex((value) => {
                  return value > 0 ? value - 1 : keywords.length - 1;
                });
              } else if (e.key === 'ArrowDown') {
                setActiveIndex((value) => {
                  return value < keywords.length - 1 ? value + 1 : 0;
                });
              }
            }
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <div
          style={{ width: height, height }}
          className={styles.btn}
          onClick={handleSearch}
        >
          <SearchOutlined className={styles.icon} />
        </div>
      </Row>

      {!!keywords?.length && (
        <RecommendList
          open={focused}
          width={width}
          keywords={keywords}
          activeIndex={activeIndex}
          onChange={(value) => {
            setKeyword(value);
            onSearch?.(value);
          }}
        />
      )}
    </div>
  );
}

function RecommendList({
  open,
  width,
  keywords,
  activeIndex,
  onChange
}: {
  open: boolean;
  width?: number | string;
  keywords: string[];
  activeIndex: number;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.recommend_list} style={{ width }} hidden={!open}>
      {keywords.map((item, index) => (
        <div
          key={item}
          className={classNames(
            styles.keyword_item,
            index === activeIndex && styles.active
          )}
          onClick={() => {
            onChange(item);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
