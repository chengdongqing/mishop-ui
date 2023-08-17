import Breadcrumb from '@/components/Breadcrumb';
import classNames from 'classnames';
import { ReactNode, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './index.module.css';
import menus from './menus.ts';

export default function UserLayout() {
  const { pathname } = useLocation();
  const [title, setTitle] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setTitle(document.title.split(' - ')[0]);
    }, 200);
  }, [pathname]);

  return (
    <div
      style={{
        paddingBottom: '4rem',
        backgroundColor: 'var(--color-background)'
      }}
    >
      <Breadcrumb value={title} />
      <div className={styles.container}>
        <SideMenus />
        <div style={{ flex: 1 }}>
          <div className={styles.main}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

function SideMenus() {
  const { pathname } = useLocation();

  return (
    <div>
      <div className={styles.side_wrapper}>
        {menus.map((item) => (
          <div key={item.label} className={styles.menu_group}>
            <div className={styles.title}>{item.label}</div>
            {item.children?.map((menu) => (
              <Link
                key={menu.label}
                target={menu.target}
                to={menu.href as string}
                className={classNames(
                  styles.item,
                  menu.href === pathname && styles.active
                )}
              >
                {menu.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

UserLayout.Header = function Header({
  title,
  extra
}: {
  title: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      {!!extra && <span className={styles.extra}>{extra}</span>}
    </div>
  );
};

UserLayout.Empty = function Empty({ title = '数据为空' }) {
  return <div className={styles.empty_tips}>{title}</div>;
};
