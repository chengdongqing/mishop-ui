import openAgreementsDeclaring from '@/components/AgreementsDeclaring';
import popup from '@/components/Popup';
import Space from '@/components/Space';
import toast from '@/components/Toast';
import cartSlice from '@/store/slices/cartSlice.ts';
import userSlice, { useHasLogin, useUserInfo } from '@/store/slices/userSlice.ts';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../index.module.less';

const menus = [
  {
    key: '/user',
    label: '个人中心'
  },
  {
    key: '/user/favorites',
    label: '我的喜欢'
  },
  {
    key: '/account',
    label: '我的帐户'
  }
];

export default function UserNavs({ miniHeader = false }) {
  const hasLogin = useHasLogin();
  return (
    <div className={classNames(miniHeader && styles.mini_header)}>
      {hasLogin ? <NavsWithLogin /> : <NavsWithoutLogin />}
    </div>
  );
}

function NavsWithLogin() {
  const [open, setOpen] = useState(false);
  const userInfo = useUserInfo();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Space split={<div className={styles.sep} />}>
      <div
        className={classNames(styles.nav_item, styles.user_container)}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <Space size={'0.4rem'} className={styles.btn}>
          <Link
            to={'/user'}
            className={classNames(styles.username, 'text-ellipsis')}
          >
            {userInfo?.name}
          </Link>
          <DownOutlined />
        </Space>

        <div
          className={styles.popover}
          style={{ height: open ? '13.6rem' : 0 }}
        >
          <div style={{ padding: '0.8rem 0' }}>
            {menus.map((item) => (
              <Link key={item.key} to={item.key} className={styles.menu_item}>
                {item.label}
              </Link>
            ))}
            <span
              className={classNames(styles.menu_item, styles.danger)}
              onClick={() => {
                popup.confirm('确定退出登录吗？', {
                  onOk() {
                    return new Promise((resolve) => {
                      setTimeout(() => {
                        dispatch(userSlice.actions.setUser(null));
                        dispatch(cartSlice.actions.setCart([]));
                        navigate('/', { replace: true });
                        toast.warning('已退出登录');
                        resolve();
                      }, 1000);
                    });
                  }
                });
              }}
            >
              退出登录
            </span>
          </div>
        </div>
      </div>
      <Link to={'/orders'} className={styles.nav_item}>
        我的订单
      </Link>
    </Space>
  );
}

function NavsWithoutLogin() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Space split={<div className={styles.sep} />}>
      <a
        className={styles.nav_item}
        onClick={() => {
          openAgreementsDeclaring(() => {
            navigate('/auth/login', {
              state: {
                pathname
              }
            });
          });
        }}
      >
        登录
      </a>
      <a
        className={styles.nav_item}
        onClick={() => {
          openAgreementsDeclaring(() => {
            navigate('/auth/register');
          });
        }}
      >
        注册
      </a>
    </Space>
  );
}
