import Button from '@/components/Button';
import Iconfont from '@/components/Iconfont';
import Loading from '@/components/Loading';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { useCartCounter, useIsEmptyCart } from '@/pages/Cart/Cart/MainCart/helpers.ts';
import cartSlice, { useCartProducts } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, formatAmount } from '@/utils';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const products = useCartProducts();
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
    }, 1500);
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
          <Loading type={'wave'} style={{ padding: '5rem' }} />
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
  products: CartProduct[];
  totalNumber: number;
  totalAmount: number;
  autoScroll: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <>
      <div
        className={styles.products}
        style={{ overflowY: autoScroll ? 'auto' : 'hidden' }}
      >
        {products.map((item) => (
          <Row
            key={item.name}
            align={'middle'}
            justify={'space-between'}
            className={styles.product_item}
          >
            <Link to={buildProductUrl(item.id)} style={{ flex: 1 }}>
              <Space size={'1rem'}>
                <img
                  alt={item.name}
                  src={item.pictureUrl}
                  className={styles.img}
                />
                <div className={styles.label}>{item.name}</div>
              </Space>
            </Link>
            <div className={styles.price}>
              {formatAmount(item.price)} x {item.number}
            </div>
            <Iconfont
              type={'i-close'}
              className={styles.icon_remove}
              onClick={() => {
                dispatch(cartSlice.actions.removeProduct(item));
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
