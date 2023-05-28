import Row from '@/components/Row';
import Space from '@/components/Space';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import styles from './index.module.less';

export default function AuthLayout() {
  return (
    <Row className={styles.container}>
      <img
        src={
          'https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.92c693b4..jpg'
        }
        alt={''}
        className={styles.banner}
      />

      <div className={styles.main}>
        <Header />
        <FormCard />
        <Footer />
      </div>
    </Row>
  );
}

const pages = [
  {
    label: '登录',
    path: '/auth/login'
  },
  {
    label: '注册',
    path: '/auth/register'
  }
];

function FormCard() {
  const { pathname } = useLocation();
  const current = useMemo(() => {
    return pages.findIndex((item) => item.path === pathname);
  }, [pathname]);

  return (
    <div className={styles.card}>
      <div className={styles.tabs}>
        <Space size={'2rem'}>
          {pages.map((item, index) => (
            <Link
              key={item.label}
              to={item.path}
              className={classNames(
                styles.item,
                index === current && styles.active
              )}
            >
              {item.label}
            </Link>
          ))}
        </Space>
        <div
          className={styles.ink_bar}
          style={{ left: `calc(6.7rem * ${current})` }}
        />
      </div>

      <Outlet />
    </div>
  );
}

function Footer() {
  return (
    <div className={styles.footer}>
      小米公司版权所有-京ICP备10046444-
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134"
        target="_blank"
        rel="noopener noreferrer"
      >
        京公网安备11010802020134号
      </a>
      -京ICP证110507号
    </div>
  );
}
