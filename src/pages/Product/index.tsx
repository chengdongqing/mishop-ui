import Button from '@/components/Button';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useDocumentTitle from '@/hooks/useDocumentTitle.ts';
import classNames from 'classnames';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './index.module.less';

const name = 'Xiaomi 13 Ultra系列';

export default function ProductPage() {
  const { label } = useParams<{ label: string }>();
  useDocumentTitle(name);

  const { pathname } = useLocation();
  // 子页面切换后自动滚动到顶部
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <>
      <div className={styles.nav_bar}>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.container}
        >
          <div className={styles.label}>{name}</div>
          <Space>
            <Space
              split={<span style={{ color: 'var(--color-border)' }}>|</span>}
              className={styles.navs}
            >
              <Link
                to={`/product/${label}`}
                className={classNames(
                  pathname.endsWith(label as string) && styles.disabled
                )}
              >
                概述页
              </Link>
              <Link
                to={`/product/${label}/specs`}
                className={classNames(
                  pathname.endsWith('specs') && styles.disabled
                )}
              >
                参数页
              </Link>
              <Link
                to={`/product/${label}/comments`}
                className={classNames(
                  pathname.endsWith('comments') && styles.disabled
                )}
              >
                用户评价
              </Link>
            </Space>
            {!pathname.endsWith('buy') && (
              <Link to={`/product/${label}/buy`}>
                <Button className={styles.btn_buy}>立即购买</Button>
              </Link>
            )}
          </Space>
        </Row>
      </div>

      <div style={{ minWidth: 'var(--width-primary)' }}>
        <Outlet />
      </div>
    </>
  );
}
