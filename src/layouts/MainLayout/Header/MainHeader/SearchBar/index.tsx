import { usePlaceholder } from './helpers.ts';
import { SearchKeywords } from './const.ts';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';
import Row from '@/components/Row';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchBar() {
  const placeholder = usePlaceholder(SearchKeywords.slice(1));
  const [focused, setFocused] = useState(false);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    setKeyword(SearchKeywords[activeIndex] || '');
  }, [activeIndex, setKeyword]);

  return (
    <div className={classNames(styles.container, focused && styles.focused)}>
      <Row>
        <input
          value={keyword}
          className={styles.input}
          placeholder={placeholder}
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
            if (e.key === 'ArrowUp') {
              setActiveIndex((value) => {
                return value > 0 ? value - 1 : SearchKeywords.length - 1;
              });
            } else if (e.key === 'ArrowDown') {
              setActiveIndex((value) => {
                return value < SearchKeywords.length - 1 ? value + 1 : 0;
              });
            }
          }}
        />
        <div className={styles.btn}>
          <SearchOutlined className={styles.icon} />
        </div>
      </Row>

      <TipsList
        open={focused}
        activeIndex={activeIndex}
        onChange={setKeyword}
      />
    </div>
  );
}

function TipsList({
  open,
  activeIndex,
  onChange
}: {
  open: boolean;
  activeIndex: number;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.tips_list} hidden={!open}>
      {SearchKeywords.map((item, index) => (
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
