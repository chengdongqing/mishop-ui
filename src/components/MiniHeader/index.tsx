import Logo from '@/components/Logo';
import Row from '@/components/Row';
import Space from '@/components/Space';
import UserNavs from '@/layouts/MainLayout/Header/TopBar/UserNavs';
import { ReactNode } from 'react';
import styles from './index.module.css';

export default function MiniHeader({
  title,
  extra
}: {
  title: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <div className={styles.mini_header}>
      <Row
        align={'middle'}
        justify={'space-between'}
        className={styles.container}
      >
        <Space size={'4.8rem'}>
          <Logo />
          <Space size={'1.2rem'}>
            <div className={styles.title}>{title}</div>
            {!!extra && <div className={styles.extra}>{extra}</div>}
          </Space>
        </Space>
        <UserNavs miniHeader />
      </Row>
    </div>
  );
}
