import Checkbox from '@/components/Checkbox';
import Form from '@/components/Form';
import Iconfont from '@/components/Iconfont';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useFormItem from '@/hooks/useFormItem.ts';
import classNames from 'classnames';
import styles from './index.module.css';

export default function SortBar() {
  return (
    <Row className={styles.container} justify={'space-between'}>
      <Form.Item name={'sortBy'}>
        <Sorter />
      </Form.Item>

      <Form.Item name={'onlyAvailable'}>
        <Checkbox value={true}>仅看有货</Checkbox>
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
    value: 'NEWEST'
  },
  {
    label: '销量',
    value: 'SALES'
  }
];

function Sorter({
  value: propValue,
  defaultValue,
  onChange
}: {
  value?: string;
  defaultValue?: string;
  onChange?(value?: string): void;
}) {
  const [value, setValue] = useFormItem(propValue, defaultValue, onChange);

  return (
    <Space size={'3rem'} split={<span className={styles.sep} />}>
      {SortOptions.map((item) => (
        <div
          key={item.label}
          className={classNames(
            styles.sort_item,
            item.value === value && styles.active
          )}
          onClick={() => {
            setValue(item.value);
          }}
        >
          {item.label}
        </div>
      ))}
      <div
        className={classNames(
          styles.sort_item,
          value?.startsWith('PRICE') && styles.active
        )}
        onClick={() => {
          const val = value?.endsWith('ASC') ? 'PRICE_DESC' : 'PRICE_ASC';
          setValue(val);
        }}
      >
        价格
        <Iconfont
          type={'i-arrow-down-long'}
          className={classNames(
            styles.icon_arrow,
            value === 'PRICE_DESC' && styles.up
          )}
        />
      </div>
    </Space>
  );
}
