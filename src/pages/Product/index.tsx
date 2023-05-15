import Button from '@/components/Button';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useDocumentTitle from '@/hooks/useDocumentTitle.ts';
import { Link, Outlet, useParams } from 'react-router-dom';
import styles from './index.module.less';

export default function ProductPage() {
  const { label } = useParams<{ label: string }>();
  useDocumentTitle('Xiaomi 13 Ultra 限量定制色');

  return (
    <>
      <div className={styles.nav_bar}>
        <Row
          align={'middle'}
          justify={'space-between'}
          className={styles.container}
        >
          <div className={styles.label}>Xiaomi 13 Ultra 限量定制色</div>
          <Space>
            <Space
              split={<span style={{ color: '#e0e0e0' }}>|</span>}
              className={styles.navs}
            >
              <Link to={`/product/${label}`}>概述页</Link>
              <Link to={`/product/${label}/specs`}>参数页</Link>
              <Link to={`/product/${label}/comments`}>用户评价</Link>
            </Space>
            <Link to={`${location.pathname}/buy`}>
              <Button className={styles.btn_buy}>立即购买</Button>
            </Link>
          </Space>
        </Row>
      </div>

      <div style={{ minWidth: 'var(--width-primary)' }}>
        <Outlet />
      </div>
    </>
  );
}
