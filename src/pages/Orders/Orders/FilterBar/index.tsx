import Row from '@/components/Row';
import SearchBar from '@/components/SearchBar';
import { OrderStatus } from '@/pages/Orders/enums.ts';
import classNames from 'classnames';
import styles from './index.module.less';

export default function FilterBar({
  values,
  onChange
}: {
  values: RecordsType;
  onChange(values: RecordsType): void;
}) {
  return (
    <Row
      align={'middle'}
      justify={'space-between'}
      className={styles.container}
    >
      <div className={styles.status_list}>
        {Object.entries({
          '': '全部',
          ...OrderStatus
        }).map(([value, label]) => (
          <div
            key={label}
            className={classNames(
              styles.item,
              (value === values.status || (!values.status && !value)) &&
                styles.active
            )}
            onClick={() => {
              onChange({ status: value });
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <SearchBar
        width={'22rem'}
        height={'4.2rem'}
        fontSize={'1.2rem'}
        placeholder={'输入商品名称、订单号'}
        onSearch={(keyword) => {
          onChange({ keyword });
        }}
      />
    </Row>
  );
}
