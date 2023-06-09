import { Footer } from '@/layouts/AuthLayout';
import Header from '@/layouts/AuthLayout/Header';
import { useUserInfo } from '@/store/slices/userSlice.ts';
import classNames from 'classnames';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.less';

export default function AccountLayout() {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <Header />

      <div className={styles.container}>
        <SideBar />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

const menus = [
  {
    label: '登录与安全',
    href: '/account'
  },
  {
    label: '个人信息',
    href: '/account/profile'
  },
  {
    label: '隐私中心',
    href: '/account/privacy'
  },
  {
    label: '帮助中心',
    href: 'https://account.xiaomi.com/helpcenter',
    target: '_blank'
  }
];

function SideBar() {
  const userInfo = useUserInfo();
  const { pathname } = useLocation();

  return (
    <div className={styles.side_bar}>
      <div className={styles.profile}>
        <img
          src={userInfo?.avatarUrl}
          alt={userInfo?.name}
          className={styles.avatar}
        />
        <div>{userInfo?.name}</div>
        <div>+86 {userInfo?.phoneNumber}</div>
      </div>
      <div className={styles.menus}>
        {menus.map((item) => (
          <Link key={item.label} to={item.href} target={item.target}>
            <div
              className={classNames(
                styles.menu_item,
                item.href === pathname && styles.active
              )}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

AccountLayout.Title = ({ title }: { title: string }) => {
  return (
    <div className={styles.page_title}>
      <div>{title}</div>
    </div>
  );
};
