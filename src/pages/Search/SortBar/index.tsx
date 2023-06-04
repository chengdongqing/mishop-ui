import Checkbox from '@/components/Checkbox';
import Form from '@/components/Form';
import Iconfont from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useFormItem from '@/hooks/useFormItem.ts';
import classNames from 'classnames';
import { Key } from 'react';
import styles from './index.module.less';

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

export default function SortBar() {
  return (
    <Row className={styles.container} justify={'space-between'}>
      <Form.Item name={'sortBy'}>
        <Sorter />
      </Form.Item>

      <Form.Item name={'checks'}>
        <Checkbox.Group>
          <Space size={'3rem'}>
            {CheckOptions.map((item) => (
              <Checkbox key={item.value as Key} value={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </Row>
  );
}

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

function Sorter({
  value,
  defaultValue,
  onChange
}: {
  value?: string;
  defaultValue?: string;
  onChange?(value?: string): void;
}) {
  const { finalValue, valueRef, formItemCtx, update } = useFormItem(
    value,
    defaultValue
  );
  function handleChange(val?: string) {
    formItemCtx.onChange?.(val);
    valueRef.current = val;
    onChange?.(val);
    update();
  }

  return (
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
            item.value === finalValue && styles.active
          )}
          onClick={() => {
            handleChange(item.value);
          }}
        >
          {item.label}
        </div>
      ))}
      <div
        className={classNames(
          styles.sort_item,
          finalValue?.startsWith('price') && styles.active
        )}
        onClick={() => {
          const val = finalValue?.endsWith('asc') ? 'price-desc' : 'price-asc';
          handleChange(val);
        }}
      >
        价格
        <Iconfont
          type={'i-arrow-down-long'}
          className={classNames(
            styles.icon_arrow,
            finalValue === 'price-desc' && styles.up
          )}
        />
      </div>
    </Space>
  );
}
