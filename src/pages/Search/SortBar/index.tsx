import Checkbox from '@/components/Checkbox';
import Iconfont from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import classNames from 'classnames';
import styles from './index.module.less';

const SortOptions = [
  {
    label: '综合',
    value: undefined
  },
  {
    label: '新品',
    value: 'new'
  },
  {
    label: '销量',
    value: 'sales'
  }
];

const CheckOptions = [
  {
    label: '促销',
    value: 'promo'
  },
  {
    label: '分期',
    value: 'instalment'
  },
  {
    label: '仅看有货',
    value: 'inStock'
  }
];

export default function SortBar({
  sortBy,
  checks,
  onSortChange,
  onChecksChange
}: {
  sortBy: string | undefined;
  checks: string[];
  onSortChange: (value: string | undefined) => void;
  onChecksChange: (values: string[]) => void;
}) {
  return (
    <Row className={styles.container} justify={'space-between'}>
      <Space
        size={'3rem'}
        className={styles.sorts}
        split={<span className={styles.sep} />}
      >
        {SortOptions.map((item) => (
          <div
            key={item.label}
            className={classNames(
              styles.sort_item,
              item.value === sortBy && styles.active
            )}
            onClick={() => {
              onSortChange(item.value);
            }}
          >
            {item.label}
          </div>
        ))}
        <div
          className={classNames(
            styles.sort_item,
            sortBy?.startsWith('price') && styles.active
          )}
          onClick={() => {
            onSortChange(sortBy?.endsWith('asc') ? 'price-desc' : 'price-asc');
          }}
        >
          价格
          <Iconfont
            type={'i-arrow-down-long'}
            className={classNames(
              styles.icon_arrow,
              sortBy === 'price-desc' && styles.up
            )}
          />
        </div>
      </Space>

      <Space size={'3rem'}>
        {CheckOptions.map((item) => (
          <Checkbox
            key={item.label}
            checked={checks.includes(item.value)}
            onChange={(checked) => {
              if (checked) {
                onChecksChange(checks.concat(item.value));
              } else {
                const index = checks.findIndex((item1) =>
                  Object.is(item1, item.value)
                );
                checks.splice(index, 1);
                onChecksChange([...checks]);
              }
            }}
          >
            {item.label}
          </Checkbox>
        ))}
      </Space>
    </Row>
  );
}
