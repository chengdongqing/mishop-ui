import Breadcrumb from '@/components/Breadcrumb';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.less';
import menus from './menus.ts';

export default function UserLayout() {
  const { state } = useLocation();

  return (
    <div
      style={{
        paddingBottom: '4rem',
        backgroundColor: 'var(--color-background)'
      }}
    >
      <Breadcrumb value={state?.title || ''} />
      <div className={styles.container}>
        <SideMenus />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function SideMenus() {
  return (
    <div className={styles.side_wrapper}>
      {menus.map((item) => (
        <div key={item.label} className={styles.menu_group}>
          <div className={styles.title}>{item.label}</div>
          {item.children?.map((menu) => (
            <Link
              key={menu.label}
              target={menu.target}
              to={menu.href as string}
              className={styles.item}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
