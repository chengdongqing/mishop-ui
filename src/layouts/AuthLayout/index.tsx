import Row from '@/components/Row';
import Space from '@/components/Space';
import useElementRect from '@/hooks/useElementRect.ts';
import classNames from 'classnames';
import { useMemo, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import styles from './index.module.less';

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

export default function AuthLayout() {
  const { pathname } = useLocation();
  const current = useMemo(() => {
    return pages.findIndex((item) => pathname.startsWith(item.path));
  }, [pathname]);
  const isPwdReset = useMemo(() => {
    return pathname.endsWith('/password-reset');
  }, [pathname]);

  const cardRef = useRef<HTMLDivElement>(null);
  const [rect] = useElementRect(cardRef);

  return (
    <Row
      style={{
        height: '100vh',
        minHeight: `calc(${rect?.height || 0}px + ${isPwdReset ? 40 : 25}rem)`
      }}
    >
      {!isPwdReset && (
        <img
          src={
            'https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.92c693b4..jpg'
          }
          alt={''}
          className={styles.banner}
        />
      )}

      <div className={styles.main}>
        <Header />
        {isPwdReset && <div className={styles.title}>重置密码</div>}
        <div ref={cardRef} className={styles.card}>
          {!isPwdReset && (
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
              {current !== -1 && (
                <div
                  className={styles.ink_bar}
                  style={{ left: `calc(6.7rem * ${current})` }}
                />
              )}
            </div>
          )}
          <Outlet />
        </div>
        <Footer />
      </div>
    </Row>
  );
}

export function Footer() {
  return (
    <div className={styles.footer}>
      小米公司版权所有-京ICP备10046444-
      <a
        href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134"
        rel="noopener noreferrer"
        target="_blank"
      >
        京公网安备11010802020134号
      </a>
      -京ICP证110507号
    </div>
  );
}
