import Logo from '@/components/Logo';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function MiniHeader() {
  return (
    <div className={styles.mini_header}>
      <Row
        align={'middle'}
        justify={'space-between'}
        className={styles.container}
      >
        <Space size={'4.8rem'}>
          <Logo />
          <div className={styles.title}>我的购物车</div>
        </Space>
        <Space
          split={<span style={{ color: '#b0b0b0' }}>|</span>}
          className={styles.links}
        >
          <Link to={'/login'}>登录</Link>
          <Link to={'/register'}>注册</Link>
        </Space>
      </Row>
    </div>
  );
}
