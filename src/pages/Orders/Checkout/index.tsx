import Button from '@/components/Button';
import Grid from '@/components/Grid';
import MiniHeader from '@/components/MiniHeader';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useElementVisible from '@/hooks/useElementVisible.ts';
import { useCartCounter } from '@/pages/Cart/Cart/MainCart/helpers.ts';
import { AddressGroup } from '@/pages/User/Addresses';
import { useCartProducts } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import Decimal from 'decimal.js';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export default function CheckoutPage() {
  const [address, setAddress] = useState<ShippingInfo>();

  return (
    <>
      <MiniHeader title={'确认订单'} />
      <div
        style={{
          padding: '4rem 0 6rem',
          backgroundColor: 'var(--color-background)'
        }}
      >
        <div className={styles.container}>
          <AddressList address={address} onChange={setAddress} />
          <ProductList />
          <Shipment />
          <BillInfos />
          <FooterBar address={address} />
        </div>
      </div>
    </>
  );
}

function AddressList({
  address,
  onChange
}: {
  address?: ShippingInfo;
  onChange(value: ShippingInfo): void;
}) {
  const [frequentlyUsedAddress, setFrequentlyUsedAddress] =
    useState<ShippingInfo>();
  const containerRef = useRef<HTMLDivElement>(null);
  const fixed = useElementVisible(containerRef, (rect) => {
    return rect.bottom <= 0;
  });

  return (
    <>
      <div ref={containerRef} className={styles.address_list}>
        <div className={styles.title}>收货地址</div>
        <AddressGroup
          selectMode
          columns={4}
          value={address?.id}
          defaultExpand={false}
          onChange={onChange}
          onLoaded={setFrequentlyUsedAddress}
        />
      </div>

      {!address && !!frequentlyUsedAddress && fixed && (
        <div className={styles.fixed_header}>
          <Row
            align={'middle'}
            justify={'space-between'}
            className={styles.wrapper}
          >
            <Space size={'2.4rem'}>
              <span>{frequentlyUsedAddress.username}</span>
              <span>{frequentlyUsedAddress.phoneNumber}</span>
              <span>{frequentlyUsedAddress.address.join(' ')}</span>
            </Space>
            <Button
              className={styles.btn}
              onClick={() => {
                onChange(frequentlyUsedAddress);
                containerRef.current?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              选择该收货地址
            </Button>
          </Row>
        </div>
      )}
    </>
  );
}

function ProductList() {
  const products = useCartProducts(true);

  return (
    <div className={styles.product_list}>
      <div className={styles.title}>商品信息</div>
      <div>
        {products.map((item) => (
          <Row key={item.name} align={'middle'} className={styles.item}>
            <Space size={'1rem'} style={{ flex: 1 }}>
              <img src={item.pictureUrl} alt={item.name} />
              <Link
                to={buildProductUrl(item.id)}
                className={styles.name}
                target={'_blank'}
              >
                {item.name}
              </Link>
            </Space>
            <div className={styles.price_number}>
              {formatAmount(item.price)} x {item.number}
            </div>
            <div className={styles.subtotal}>
              {formatAmount(
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
        <div className={styles.value}>{formatAmount(totalNumber, '件')}</div>
        <div className={styles.label}>商品总价：</div>
        <div className={styles.value}>{formatAmount(totalAmount)}</div>
        <div className={styles.label}>优惠金额：</div>
        <div className={styles.value}>-{formatAmount(0.01)}</div>
        <div className={styles.label}>运费：</div>
        <div className={styles.value}>{formatAmount(0)}</div>
        <div className={styles.label} style={{ lineHeight: '3rem' }}>
          应付总额：
        </div>
        <div className={styles.value}>
          <span style={{ fontSize: '3rem' }}>
            {formatAmount(new Decimal(totalAmount).sub(0.01).toNumber(), '')}
          </span>
          <span> 元</span>
        </div>
      </Grid>
    </div>
  );
}

function FooterBar({ address }: { address?: ShippingInfo }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

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
        <Button
          loading={submitting}
          onClick={() => {
            if (!address) {
              popup.alert('请选择地址');
            } else {
              setSubmitting(true);
              setTimeout(() => {
                navigate('/orders/pay', {
                  replace: true
                });
              }, 1000);
            }
          }}
        >
          立即下单
        </Button>
      </Space>
    </Row>
  );
}
