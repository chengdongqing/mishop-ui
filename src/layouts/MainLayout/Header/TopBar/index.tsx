import Iconfont from '@/components/Iconfont';
import Loading from '@/components/Loading';
import Space from '@/components/Space';
import useToggle from '@/hooks/useToggle.ts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LocationSelect from '../../../../components/LocationSelect';
import { NavItems } from './const';
import styles from './index.module.less';

export default function TopBar() {
  const [locationsOpen, toggleLocationsOpen] = useToggle();

  return (
    <div style={{ backgroundColor: '#333' }}>
      <div className={styles.container}>
        <Space split={<div className={styles.sep} />}>
          {NavItems.map((item) => (
            <a
              key={item.name}
              rel={'nofollow'}
              href={item.link}
              target={'_blank'}
              className={styles.nav_item}
            >
              {item.name}
            </a>
          ))}
          <a
            className={styles.nav_item}
            onClick={() => {
              toggleLocationsOpen();
            }}
          >
            Select Location
          </a>
        </Space>

        <Space>
          <Space split={<div className={styles.sep} />}>
            <Link to={'/login'} className={styles.nav_item}>
              登录
            </Link>
            <Link to={'/register'} className={styles.nav_item}>
              注册
            </Link>
          </Space>
          <Link to={'/cart'} className={styles.nav_item}>
            <MiniCart />
          </Link>
        </Space>
      </div>

      <LocationSelect
        open={locationsOpen}
        onCancel={() => {
          toggleLocationsOpen();
        }}
      />
    </div>
  );
}

function MiniCart() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  function init() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <div
      className={styles.mini_cart}
      onMouseEnter={() => {
        setOpen(true);
        init();
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <Space size={4} className={styles.btn}>
        <Iconfont type={'i-cart'} style={{ fontSize: '2.2rem' }} />
        <div>购物车（0）</div>
      </Space>

      <div
        className={styles.popover}
        style={{
          height: open ? '12rem' : 0
        }}
      >
        {loading ? (
          <Loading type={'wave'} style={{ padding: '5rem' }} />
        ) : (
          <div className={styles.placeholder}>
            购物车中还没有商品，赶紧选购吧！
          </div>
        )}
      </div>
    </div>
  );
}
