import Button from '@/components/Button';
import Row from '@/components/Row';
import Space from '@/components/Space';
import useDocumentTitle from '@/hooks/useDocumentTitle.ts';
import { Link, useLocation } from 'react-router-dom';
import styles from './index.module.less';
import Xiaomi13Ultra from './Xiaomi13Ultra';

export default function ProductPage() {
  const location = useLocation();
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
              <Link to={location.pathname}>概述页</Link>
              <Link to={`${location.pathname}/specs`}>参数页</Link>
              <Link to={`${location.pathname}/comments`}>用户评价</Link>
            </Space>
            <Link to={`${location.pathname}/buy`}>
              <Button className={styles.btn_buy}>立即购买</Button>
            </Link>
          </Space>
        </Row>
      </div>

      <div style={{ minWidth: 'var(--width-primary)' }}>
        <Xiaomi13Ultra />
      </div>
    </>
  );
}
