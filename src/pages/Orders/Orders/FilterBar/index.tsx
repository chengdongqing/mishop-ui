import Row from '@/components/Row';
import SearchBar from '@/components/SearchBar';
import classNames from 'classnames';
import { Key, useState } from 'react';
import styles from './index.module.less';

const OrderStatuses = [
  {
    label: '全部',
    value: undefined
  },
  {
    label: '待支付',
    value: 1
  },
  {
    label: '待收货',
    value: 2
  }
];

export default function FilterBar({
  onChange
}: {
  onChange?: (values: Record<string, unknown>) => void;
}) {
  const [activeStatus, setActiveStatus] = useState<Key>();

  return (
    <Row
      align={'middle'}
      justify={'space-between'}
      className={styles.container}
    >
      <div className={styles.status_list}>
        {OrderStatuses.map((item) => (
          <div
            key={item.label}
            className={classNames(
              styles.item,
              item.value === activeStatus && styles.active
            )}
            onClick={() => {
              setActiveStatus(item.value);
              onChange?.({ status: item.value });
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
      <SearchBar
        width={'22rem'}
        height={'4.2rem'}
        fontSize={'1.2rem'}
        placeholder={'输入商品名称、订单号'}
        onSearch={(keyword) => {
          onChange?.({ keyword });
        }}
      />
    </Row>
  );
}
