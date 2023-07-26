import Grid from '@/components/Grid';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import useRequest from '@/hooks/useRequest.ts';
import useToggle from '@/hooks/useToggle.ts';
import UserLayout from '@/layouts/UserLayout';
import { formatAddress } from '@/pages/User/Addresses/utils.ts';
import services, { AddressDTO } from '@/services/address.ts';
import { DownOutlined, PlusCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import EditingPopup from './EditingPopup';
import styles from './index.module.less';

export default function ShippingAddresses() {
  return (
    <>
      <UserLayout.Header title={'收货地址'} />
      <AddressGroup />
    </>
  );
}

interface AddressGroupProps {
  value?: number;
  columns?: number;
  selectMode?: boolean;
  defaultExpand?: boolean;

  onChange?(value: AddressDTO): void;

  onLoaded?(value: AddressDTO): void;
}

export function AddressGroup({
  value: propValue,
  columns = 3,
  selectMode = false,
  defaultExpand = true,
  onChange,
  onLoaded
}: AddressGroupProps) {
  const [value, setValue] = useState<number>();
  const finalValue = propValue !== undefined ? propValue : value;

  const { data, run } = useRequest(services.fetchAddresses);

  const [expand, toggleExpand] = useToggle(false);
  const height = useMemo(() => {
    if (defaultExpand) {
      return undefined;
    }
    return data && expand
      ? `${(17.8 + 1.6) * Math.ceil((data.length + 1) / 4) - 1.6}rem`
      : '17.8rem';
  }, [data, defaultExpand, expand]);

  // 回调地址信息
  useEffect(() => {
    if (data?.length) {
      onLoaded?.(data[0]);
    }
  }, [data, onLoaded]);

  // 详情弹窗相关
  const [modalOpen, toggleModal] = useToggle();
  const [currentAddress, setCurrentAddress] = useState<AddressDTO>();

  return (
    <div>
      <Grid
        gap={'1.6rem'}
        columns={columns}
        style={{ height }}
        className={styles.container}
      >
        {!selectMode && <AddBtn toggleModal={toggleModal} />}
        {data?.map((item) => (
          <AddressItem
            key={item.id}
            item={item}
            activeId={finalValue}
            selectMode={selectMode}
            onSelect={() => {
              if (selectMode) {
                onChange?.(item);
                setValue(item.id);
              }
            }}
            onModify={() => {
              setCurrentAddress(item);
              toggleModal();
            }}
            onChange={run}
          />
        ))}
        {selectMode && <AddBtn toggleModal={toggleModal} />}
      </Grid>
      {!defaultExpand && !!data && data.length >= columns && (
        <div className={styles.btn_more} onClick={toggleExpand}>
          {expand ? '收起' : '显示'}更多地址{' '}
          <DownOutlined
            className={classNames(styles.icon, expand && styles.active)}
          />
        </div>
      )}

      <EditingPopup
        open={modalOpen}
        values={currentAddress}
        onChange={run}
        onCancel={() => {
          toggleModal();
          setCurrentAddress(undefined);
        }}
      />
    </div>
  );
}

function AddressItem({
  item,
  activeId,
  selectMode,
  onSelect,
  onModify,
  onChange
}: {
  item: AddressDTO;
  activeId?: number;
  selectMode: boolean;
  onSelect(): void;
  onModify(): void;
  onChange(): void;
}) {
  return (
    <div
      key={item.id}
      className={classNames(styles.item, item.id === activeId && styles.active)}
      onClick={onSelect}
    >
      <Row align={'middle'} justify={'space-between'} className={styles.header}>
        <div className={styles.username}>{item.recipientName}</div>
        <div className={styles.label}>{item.label}</div>
      </Row>
      <div>{item.recipientPhone}</div>
      <div>
        <div>{formatAddress(item.city)}</div>
        <div>{item.address}</div>
      </div>
      <Space size={'1rem'} className={styles.footer}>
        <span onClick={onModify}>修改</span>
        {!selectMode && (
          <span
            onClick={() => {
              popup.confirm('确定删除该地址吗？', {
                async onOk() {
                  await services.removeAddress(item.id);
                  toast.success('删除成功');
                  onChange();
                }
              });
            }}
          >
            删除
          </span>
        )}
      </Space>
    </div>
  );
}

function AddBtn({ toggleModal }: { toggleModal(): void }) {
  return (
    <div className={classNames(styles.item, styles.add)} onClick={toggleModal}>
      <div>
        <PlusCircleFilled className={styles.icon} />
        <div>添加新地址</div>
      </div>
    </div>
  );
}
