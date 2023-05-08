import Checkbox from '@/components/Checkbox';
import Iconfont from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import classNames from 'classnames';
import { Key } from 'react';
import styles from './index.module.less';

const SortOptions: OptionItem[] = [
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

const CheckOptions: OptionItem[] = [
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
  params,
  onChange
}: {
  params: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
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
              item.value === params.sortBy && styles.active
            )}
            onClick={() => {
              onChange({ sortBy: item.value });
            }}
          >
            {item.label}
          </div>
        ))}
        <div
          className={classNames(
            styles.sort_item,
            (params.sortBy as string)?.startsWith('price') && styles.active
          )}
          onClick={() => {
            onChange({
              sortBy: (params.sortBy as string)?.endsWith('asc')
                ? 'price-desc'
                : 'price-asc'
            });
          }}
        >
          价格
          <Iconfont
            type={'i-arrow-down-long'}
            className={classNames(
              styles.icon_arrow,
              params.sortBy === 'price-desc' && styles.up
            )}
          />
        </div>
      </Space>

      <Checkbox.Group
        onChange={(values) => {
          onChange({
            checkedItems: values
          });
        }}
      >
        <Space size={'3rem'}>
          {CheckOptions.map((item) => (
            <Checkbox key={item.value as Key} value={item.value}>
              {item.label}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </Row>
  );
}
