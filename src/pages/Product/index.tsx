import Button from '@/components/Button';
import DataContainer from '@/components/DataContainer';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useDocumentTitle from '@/hooks/useDocumentTitle.ts';
import { ProductDetails } from '@/services/product.ts';
import classNames from 'classnames';
import { createContext, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './index.module.css';
import useProduct from './useProduct.ts';

export const ProductContext = createContext<ProductDetails | null>(null);

export default function ProductPage() {
  const params = useParams<{
    id: string
  }>();
  const id = Number(params.id);
  const { pathname } = useLocation();
  // 子页面切换后自动滚动到顶部
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  const [product, loading, hasPages] = useProduct(id, pathname);
  useDocumentTitle(product?.name);

  return (
    <>
      <div className={styles.nav_bar}>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.container}
        >
          <div className={styles.label}>{product?.name}</div>
          <Space>
            <Space
              split={<span style={{ color: 'var(--color-border)' }}>|</span>}
              className={styles.navs}
            >
              {hasPages.sketch && (
                <Link
                  to={`/product/${id}`}
                  className={classNames(
                    pathname.endsWith(id.toString()) && styles.disabled
                  )}
                >
                  概述页
                </Link>
              )}
              {hasPages.specs && (
                <Link
                  to={`/product/${id}/specs`}
                  className={classNames(
                    pathname.endsWith('specs') && styles.disabled
                  )}
                >
                  参数页
                </Link>
              )}
              <Link
                to={`/product/${id}/reviews`}
                className={classNames(
                  pathname.endsWith('reviews') && styles.disabled
                )}
              >
                用户评价
              </Link>
            </Space>
            {!pathname.endsWith('buy') && (
              <Link to={`/product/${id}/buy`}>
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
