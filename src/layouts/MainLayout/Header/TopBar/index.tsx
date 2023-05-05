import Iconfont from '@/components/Iconfont';
import Loading from '@/components/Loading';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItems } from './const';
import styles from './index.module.less';
import Space from '@/components/Space';

export default function TopBar() {
  return (
    <div className={styles.wrapper}>
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
        </Space>

        <Space>
          <Space split={<div className={styles.sep} />}>
            <NavLink to={'/login'} className={styles.nav_item}>
              登录
            </NavLink>
            <NavLink to={'/register'} className={styles.nav_item}>
              注册
            </NavLink>
          </Space>
          <a href={'/cart'} className={styles.nav_item}>
            <MiniCart />
          </a>
        </Space>
      </div>
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
