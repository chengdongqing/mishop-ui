import Button from '@/components/Button';
import DataContainer from '@/components/DataContainer';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useDocumentTitle from '@/hooks/useDocumentTitle.ts';
import { ProductDetails } from '@/services/product.ts';
import classNames from 'classnames';
import { createContext, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './index.module.less';
import useProduct from './useProduct.ts';

export const ProductContext = createContext<ProductDetails | null>(null);

export default function ProductPage() {
  const name = useParams().name as string;
  const { pathname } = useLocation();
  // 设置文档标题
  useDocumentTitle(name);
  // 子页面切换后自动滚动到顶部
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  const [product, loading, hasPages] = useProduct(name, pathname);

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
              {hasPages.sketch && (
                <Link
                  to={`/product/${name}`}
                  className={classNames(
                    pathname.endsWith(name) && styles.disabled
                  )}
                >
                  概述页
                </Link>
              )}
              {hasPages.specs && (
                <Link
                  to={`/product/${name}/specs`}
                  className={classNames(
                    pathname.endsWith('specs') && styles.disabled
                  )}
                >
                  参数页
                </Link>
              )}
              <Link
                to={`/product/${name}/comments`}
                className={classNames(
                  pathname.endsWith('comments') && styles.disabled
                )}
              >
                用户评价
              </Link>
            </Space>
            {!pathname.endsWith('buy') && (
              <Link to={`/product/${name}/buy`}>
                <Button className={styles.btn_buy}>立即购买</Button>
              </Link>
            )}
          </Space>
        </Row>
      </div>

      <div style={{ minWidth: 'var(--width-primary)' }}>
        <ProductContext.Provider value={product}>
          <DataContainer loading={loading}>
            <Outlet />
          </DataContainer>
        </ProductContext.Provider>
      </div>
    </>
  );
}
