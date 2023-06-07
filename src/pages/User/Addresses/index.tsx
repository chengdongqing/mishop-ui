import Grid from '@/components/Grid';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import useMount from '@/hooks/useMount.ts';
import useToggle from '@/hooks/useToggle.ts';
import UserLayout from '@/layouts/UserLayout';
import { DownOutlined, PlusCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { addresses } from './const.ts';
import EditingModal from './EditingModal';
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
  onChange?(value: ShippingInfo): void;
  onLoaded?(value: ShippingInfo): void;
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

  const [expand, toggleExpand] = useToggle(false);
  const height = useMemo(() => {
    if (defaultExpand) {
      return undefined;
    }
    return expand
      ? `${(17.8 + 1.6) * Math.ceil((addresses.length + 1) / 4) - 1.6}rem`
      : '17.8rem';
  }, [defaultExpand, expand]);

  useMount(() => {
    onLoaded?.(addresses[0]);
  });

  const [modalOpen, toggleModal] = useToggle();
  const [currentAddress, setCurrentAddress] =
    useState<Record<string, unknown>>();

  return (
    <div>
      <Grid
        gap={'1.6rem'}
        columns={columns}
        style={{ height }}
        className={styles.container}
      >
        {!selectMode && <AddBtn toggleModal={toggleModal} />}
        {addresses.map((item) => (
          <div
            key={item.id}
            className={classNames(
              styles.item,
              item.id === finalValue && styles.active
            )}
            onClick={() => {
              if (selectMode) {
                onChange?.(item);
                setValue(item.id);
              }
            }}
          >
            <Row
              align={'middle'}
              justify={'space-between'}
              className={styles.header}
            >
              <div className={styles.username}>{item.username}</div>
              <div className={styles.label}>{item.label}</div>
            </Row>
            <div>{item.phoneNumber}</div>
            <div>
              {item.address.map((info) => (
                <div key={info}>{info}</div>
              ))}
            </div>
            <Space size={'1rem'} className={styles.footer}>
              <span
                onClick={() => {
                  setCurrentAddress({
                    ...item,
                    city: [
                      {
                        name: '重庆',
                        code: '500000'
                      },
                      {
                        name: '重庆市',
                        code: '500100'
                      },
                      {
                        name: '江北区',
                        code: '500105'
                      }
                    ],
                    address: item.address[1]
                  });
                  toggleModal();
                }}
              >
                修改
              </span>
              {!selectMode && (
                <span
                  onClick={() => {
                    popup.confirm('确定删除该地址吗？', {
                      onOk() {
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            toast.success('删除成功');
                            resolve();
                          }, 1000);
                        });
                      }
                    });
                  }}
                >
                  删除
                </span>
              )}
            </Space>
          </div>
        ))}
        {selectMode && <AddBtn toggleModal={toggleModal} />}
      </Grid>
      {!defaultExpand && addresses.length >= columns && (
        <div className={styles.btn_more} onClick={toggleExpand}>
          {expand ? '收起' : '显示'}更多地址{' '}
          <DownOutlined
            className={classNames(styles.icon, expand && styles.active)}
          />
        </div>
      )}

      <EditingModal
        open={modalOpen}
        values={currentAddress}
        onCancel={() => {
          toggleModal();
          setCurrentAddress(undefined);
        }}
      />
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
