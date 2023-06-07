import openAgreementsDeclaring from '@/components/AgreementsDeclaring';
import Space from '@/components/Space';
import { useHasLogin, useUserInfo } from '@/store/slices/userSlice.ts';
import { DownOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../index.module.less';
import useLogout from './useLogout.ts';

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
      {hasLogin ? <NavsWithLogin /> : <NavsWithoutLoggedIn />}
    </div>
  );
}

function NavsWithLogin() {
  const [open, setOpen] = useState(false);
  const userInfo = useUserInfo();
  const logout = useLogout();

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
              onClick={logout}
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

function NavsWithoutLoggedIn() {
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
