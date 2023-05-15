import Button from '@/components/Button';
import Iconfont from '@/components/Iconfont';
import Loading from '@/components/Loading';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { CartProduct } from '@/pages/Cart';
import { useCartCounter, useIsEmptyCart } from '@/pages/Cart/MainCart/helpers.ts';
import cartSlice, { useCartProducts } from '@/store/slices/cartSlice.ts';
import { buildProductUrl, displayAmount } from '@/utils';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const products = useCartProducts();
  const isEmptyCart = useIsEmptyCart();
  const { totalNumber, totalAmount } = useCartCounter(false);
  const height = useMemo(() => {
    if (open) {
      if (loading || !products.length) {
        return '12rem';
      }
      return `${Math.min(products.length, 5) * 8 + 10}rem`;
    }
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
      <Space
        size={4}
        className={classNames(styles.btn, !isEmptyCart && styles.active)}
        onClick={() => {
          navigate('/cart');
        }}
      >
        <Iconfont
          type={isEmptyCart ? 'i-cart' : 'i-cart-full'}
          style={{ fontSize: '2.2rem' }}
        />
        <div>购物车（{totalNumber}）</div>
      </Space>

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
          />
        )}
      </div>
    </div>
  );
}

function MainCart({
  products,
  totalNumber,
  totalAmount
}: {
  products: CartProduct[];
  totalNumber: number;
  totalAmount: number;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.products}>
        {products.map((item) => (
          <Row
            key={item.label}
            align={'middle'}
            justify={'space-between'}
            className={styles.product_item}
          >
            <Link to={buildProductUrl(item.label)} style={{ flex: 1 }}>
              <Space size={'1rem'}>
                <img
                  alt={item.label}
                  src={item.pictureUrl}
                  className={styles.img}
                />
                <div className={styles.label}>{item.label}</div>
              </Space>
            </Link>
            <div className={styles.price}>
              {displayAmount(item.price)} x {item.number}
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
            共{displayAmount(totalNumber, '件')}商品
          </div>
          <div className={styles.total_amount}>
            <span>{displayAmount(totalAmount, '')}</span>元
          </div>
        </Space>
        <Button
          className={styles.btn_order}
          onClick={() => {
            navigate('/cart');
          }}
        >
          去购物车结算
        </Button>
      </Row>
    </>
  );
}
