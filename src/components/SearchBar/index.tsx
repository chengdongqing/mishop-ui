import Row from '@/components/Row';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './index.module.less';

interface SearchBarProps {
  placeholder?: string;
  keywords?: string[];
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;

  onSearch?(value: string): void;
}

export default function SearchBar({
                                    placeholder,
                                    keywords,
                                    width,
                                    height,
                                    fontSize,
                                    onSearch
                                  }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if (keywords) {
      setKeyword(keywords[activeIndex] || '');
    }
  }, [activeIndex, keywords]);

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
            setKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (keywords && keywords.length) {
              if (e.key === 'ArrowUp') {
                setActiveIndex((value) => {
                  return value > 0 ? value - 1 : keywords.length - 1;
                });
              } else if (e.key === 'ArrowDown') {
                setActiveIndex((value) => {
                  return value < keywords.length - 1 ? value + 1 : 0;
                });
              } else if (e.key === 'Enter') {
                onSearch?.(keyword);
              }
            }
          }}
        />
        <div
          style={{ width: height, height }}
          className={styles.btn}
          onClick={() => {
            onSearch?.(keyword);
          }}
        >
          <SearchOutlined className={styles.icon} />
        </div>
      </Row>

      {!!keywords && (
        <RecommendList
          open={focused}
          width={width}
          keywords={keywords}
          activeIndex={activeIndex}
          onChange={setKeyword}
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
