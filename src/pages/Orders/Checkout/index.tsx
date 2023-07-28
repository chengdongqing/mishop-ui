import Button from '@/components/Button';
import Grid from '@/components/Grid';
import MiniHeader from '@/components/MiniHeader';
import popup from '@/components/Popup';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useCartActions from '@/hooks/useCartActions.ts';
import useElementVisible from '@/hooks/useElementVisible.ts';
import useRequest from '@/hooks/useRequest.ts';
import { useCartCounter } from '@/pages/Cart/ShoppingCart/helpers.ts';
import { AddressGroup } from '@/pages/User/Addresses';
import { formatAddress } from '@/pages/User/Addresses/utils.ts';
import { AddressDTO } from '@/services/address.ts';
import { createOrder } from '@/services/order.ts';
import { useCartItems } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import Decimal from '@/utils/decimal.ts';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export default function CheckoutPage() {
  const [address, setAddress] = useState<AddressDTO>();

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
  address?: AddressDTO;
  onChange(value: AddressDTO): void;
}) {
  const [frequentlyUsedAddress, setFrequentlyUsedAddress] =
    useState<AddressDTO>();
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
              <span>{frequentlyUsedAddress.recipientName}</span>
              <span>{frequentlyUsedAddress.recipientPhone}</span>
              <span>
                {formatAddress(frequentlyUsedAddress.city)}{' '}
                {frequentlyUsedAddress.address}
              </span>
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
  const products = useCartItems(true);

  return (
    <div className={styles.product_list}>
      <div className={styles.title}>商品信息</div>
      <div>
        {products.map((item) => (
          <Row key={item.skuId} align={'middle'} className={styles.item}>
            <Space size={'1rem'} style={{ flex: 1 }}>
              <img src={item.pictureUrl} alt={item.productName} />
              <Link
                to={buildProductUrl(item.productId)}
                className={styles.name}
                target={'_blank'}
              >
                {item.productName} {item.skuName}
              </Link>
            </Space>
            <div className={styles.price_number}>
              {formatAmount(item.price)} x {item.quantity}
            </div>
            <div className={styles.subtotal}>
              {formatAmount(
                Decimal.of(item.price).multiply(item.quantity).toNumber()
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
        <div className={styles.value}>-{formatAmount(0)}</div>
        <div className={styles.label}>运费：</div>
        <div className={styles.value}>{formatAmount(0)}</div>
        <div className={styles.label} style={{ lineHeight: '3rem' }}>
          应付总额：
        </div>
        <div className={styles.value}>
          <span style={{ fontSize: '3rem' }}>
            {formatAmount(totalAmount, '')}
          </span>
          <span> 元</span>
        </div>
      </Grid>
    </div>
  );
}

function FooterBar({ address }: {
  address?: AddressDTO
}) {
  const navigate = useNavigate();
  const { refreshCart } = useCartActions();
  const { run: submit, loading: submitting } = useRequest(
    (addressId) => createOrder(addressId),
    {
      manual: true
    }
  );

  return (
    <Row justify={'space-between'} className={styles.footer_bar}>
      <div className={styles.address_info}>
        {!!address && (
          <>
            <div>
              {address.recipientName} {address.recipientPhone}
            </div>
            <Space>
              <div>
                {formatAddress(address.city)} {address.address}
              </div>
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
          onClick={async () => {
            if (!address) {
              popup.alert('请选择地址');
            } else {
              const orderId = await submit(address.id);
              if (orderId) {
                // 刷新购物车
                refreshCart();
                // 跳转到支付页
                navigate(`/orders/pay/${orderId}`, {
                  replace: true
                });
              }
            }
          }}
        >
          立即下单
        </Button>
      </Space>
    </Row>
  );
}
