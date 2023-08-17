import Button from '@/components/Button';
import Iconfont from '@/components/Iconfont';
import Loading from '@/components/Loading';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useCartActions from '@/hooks/useCartActions.ts';
import { useCartCounter, useIsEmptyCart } from '@/pages/Cart/ShoppingCart/helpers.ts';
import { CartItemDTO } from '@/services/cart.ts';
import { useCartItems } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const products = useCartItems();
  const isEmptyCart = useIsEmptyCart();
  const { totalNumber, totalAmount } = useCartCounter(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const height = useMemo(() => {
    if (open) {
      if (!loading) {
        setTimeout(() => {
          setAutoScroll(true);
        }, 300);
      }
      if (loading || !products.length) {
        return '12rem';
      }
      return `${Math.min(products.length, 5) * 8 + 10}rem`;
    }
    setAutoScroll(false);
    return 0;
  }, [loading, open, products.length]);

  function init() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={() => {
        if (!open) {
          setOpen(true);
          init();
        }
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <Link to={'/cart'}>
        <Space
          size={4}
          className={classNames(styles.btn, !isEmptyCart && styles.active)}
        >
          <Iconfont
            type={isEmptyCart ? 'i-cart' : 'i-cart-full'}
            className={styles.icon}
          />
          <span>购物车（{totalNumber}）</span>
        </Space>
      </Link>

      <div className={styles.popover} style={{ height }}>
        {loading ? (
          <Loading style={{ padding: '5rem' }} />
        ) : !products.length ? (
          <div className={styles.placeholder}>
            购物车中还没有商品，赶紧选购吧！
          </div>
        ) : (
          <MainCart
            products={products}
            totalNumber={totalNumber}
            totalAmount={totalAmount}
            autoScroll={autoScroll}
          />
        )}
      </div>
    </div>
  );
}

function MainCart({
                    products,
                    totalNumber,
                    totalAmount,
                    autoScroll
                  }: {
  products: CartItemDTO[];
  totalNumber: number;
  totalAmount: number;
  autoScroll: boolean;
}) {
  const actions = useCartActions();

  return (
    <>
      <div
        className={styles.products}
        style={{ overflowY: autoScroll ? 'auto' : 'hidden' }}
      >
        {products.map((item) => (
          <Row
            key={item.skuId}
            align={'middle'}
            justify={'space-between'}
            className={styles.product_item}
          >
            <Link to={buildProductUrl(item.productId)} style={{ flex: 1 }}>
              <Space size={'1rem'}>
                <img
                  alt={item.productName}
                  src={item.pictureUrl}
                  className={styles.img}
                />
                <div className={styles.label}>{item.productName} {item.skuName}</div>
              </Space>
            </Link>
            <div className={styles.price}>
              {formatAmount(item.price)} x {item.quantity}
            </div>
            <Iconfont
              type={'i-close'}
              className={styles.icon_remove}
              onClick={() => {
                actions.removeCartItems([item], false);
              }}
            />
          </Row>
        ))}
      </div>
      <Row justify={'space-between'} align={'middle'} className={styles.footer}>
        <Space
          size={'0.6rem'}
          align={'start'}
          direction={'vertical'}
          style={{ marginBottom: '-0.4rem' }}
        >
          <div className={styles.total_num}>
            共{formatAmount(totalNumber, '件')}商品
          </div>
          <div className={styles.total_amount}>
            <span>{formatAmount(totalAmount, '')}</span>元
          </div>
        </Space>
        <Link to={'/cart'}>
          <Button className={styles.btn_order}>去购物车结算</Button>
        </Link>
      </Row>
    </>
  );
}
