import Button from '@/components/Button';
import Iconfont from '@/components/Iconfont';
import Loading from '@/components/Loading';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { Products } from '@/pages/Cart/const.ts';
import { buildProductUrl, displayAmount } from '@/utils';
import classNames from 'classnames';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const isEmpty = false;

export default function MiniCart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setOpen(true);
        init();
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <Link to={'/cart'}>
        <Space
          size={4}
          className={classNames(styles.btn, !isEmpty && styles.active)}
        >
          <Iconfont
            type={isEmpty ? 'i-cart' : 'i-cart-full'}
            style={{ fontSize: '2.2rem' }}
          />
          <div>购物车（{isEmpty ? 0 : 2}）</div>
        </Space>
      </Link>

      <div
        className={styles.popover}
        style={{
          height: open ? (loading ? '12rem' : 'auto') : 0
        }}
      >
        {loading ? (
          <Loading type={'wave'} style={{ padding: '5rem' }} />
        ) : isEmpty ? (
          <div className={styles.placeholder}>
            购物车中还没有商品，赶紧选购吧！
          </div>
        ) : (
          <MainCart />
        )}
      </div>
    </div>
  );
}

function MainCart() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.products}>
        {Products.map((item) => (
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
            <Iconfont type={'i-close'} className={styles.icon_remove} />
          </Row>
        ))}
      </div>
      <Row justify={'space-between'} align={'middle'} className={styles.footer}>
        <Space
          size={'0.6rem'}
          direction={'vertical'}
          style={{ marginBottom: '-0.4rem' }}
        >
          <div className={styles.total_num}>共10件商品</div>
          <div className={styles.total_amount}>
            <span>27.9</span>元
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
