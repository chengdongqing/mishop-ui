import Button from '@/components/Button';
import Grid from '@/components/Grid';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { useCartCounter } from '@/pages/Cart/MainCart/helpers.ts';
import { useCartProducts } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, displayAmount } from '@/utils';
import { PlusCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import Decimal from 'decimal.js';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addresses } from './const.ts';
import styles from './index.module.less';

export default function CheckoutPage() {
  const [activeAddressId, setActiveAddressId] = useState<number>();
  const activeAddress = useMemo(() => {
    return addresses.find((item) => item.id === activeAddressId);
  }, [activeAddressId]);

  return (
    <div
      style={{
        padding: '4rem 0 6rem',
        backgroundColor: 'var(--color-background)'
      }}
    >
      <div className={styles.container}>
        <AddressList value={activeAddressId} onChange={setActiveAddressId} />
        <ProductList />
        <Shipment />
        <BillInfos />
        <FooterBar address={activeAddress} />
      </div>
    </div>
  );
}

function AddressList({
  value,
  onChange
}: {
  value?: number;
  onChange(id: number): void;
}) {
  return (
    <div className={styles.address_list}>
      <div className={styles.title}>收货地址</div>
      <Grid columns={4} gap={'1.6rem'}>
        {addresses.map((item) => (
          <div
            key={item.id}
            className={classNames(
              styles.item,
              item.id === value && styles.active
            )}
            onClick={() => {
              onChange(item.id);
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
            <div className={styles.footer}>
              <span>修改</span>
            </div>
          </div>
        ))}
        <div className={classNames(styles.item, styles.add)}>
          <div>
            <PlusCircleFilled className={styles.icon} />
            <div>添加新地址</div>
          </div>
        </div>
      </Grid>
    </div>
  );
}

function ProductList() {
  const products = useCartProducts(true);

  return (
    <div className={styles.product_list}>
      <div className={styles.title}>商品信息</div>
      <div>
        {products.map((item) => (
          <Row key={item.label} align={'middle'} className={styles.item}>
            <Space size={'1rem'} style={{ flex: 1 }}>
              <img src={item.pictureUrl} alt={item.label} />
              <Link
                to={buildProductUrl(item.label)}
                className={styles.name}
                target={'_blank'}
              >
                {item.label}
              </Link>
            </Space>
            <div className={styles.price_number}>
              {displayAmount(item.price)} x {item.number}
            </div>
            <div className={styles.subtotal}>
              {displayAmount(
                new Decimal(item.price).mul(item.number).toNumber()
              )}
            </div>
          </Row>
        ))}
      </div>
    </div>
  );
}

function Shipment() {
  return (
    <Row align={'middle'} className={styles.shipment}>
      <div className={styles.title}>配送方式</div>
      <div className={styles.value}>包邮</div>
    </Row>
  );
}

function BillInfos() {
  const { totalNumber, totalAmount } = useCartCounter(true);

  return (
    <div className={styles.bill_infos}>
      <Grid columns={2} gap={'0.8rem'} style={{ alignItems: 'end' }}>
        <div className={styles.label}>商品件数：</div>
        <div className={styles.value}>{displayAmount(totalNumber, '件')}</div>
        <div className={styles.label}>商品总价：</div>
        <div className={styles.value}>{displayAmount(totalAmount)}</div>
        <div className={styles.label}>优惠金额：</div>
        <div className={styles.value}>-{displayAmount(0)}</div>
        <div className={styles.label}>运费：</div>
        <div className={styles.value}>{displayAmount(0)}</div>
        <div className={styles.label} style={{ lineHeight: '3rem' }}>
          应付总额：
        </div>
        <div className={styles.value}>
          <span style={{ fontSize: '3rem' }}>
            {displayAmount(totalAmount, '')}
          </span>
          <span> 元</span>
        </div>
      </Grid>
    </div>
  );
}

function FooterBar({ address }: { address?: ShippingAddress }) {
  const navigate = useNavigate();

  return (
    <Row justify={'space-between'} className={styles.footer_bar}>
      <div className={styles.address_info}>
        {!!address && (
          <>
            <div>
              {address.username} {address.phoneNumber}
            </div>
            <Space>
              <div>{address.address.join(' ')}</div>
              <div className={styles.btn}>修改</div>
            </Space>
          </>
        )}
      </div>
      <Space size={'3rem'}>
        <Button
          outlined
          className={styles.btn_back}
          onClick={() => {
            navigate(-1);
          }}
        >
          返回购物车
        </Button>
        <Button>立即下单</Button>
      </Space>
    </Row>
  );
}
