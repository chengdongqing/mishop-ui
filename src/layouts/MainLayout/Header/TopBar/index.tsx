import openLocationSelect from '@/components/LocationSelect';
import Space from '@/components/Space';
import { NavItems } from './const';
import styles from './index.module.less';
import MiniCart from './MiniCart';
import UserNavs from './UserNavs';

export default function TopBar() {
  return (
    <div style={{ backgroundColor: '#333' }}>
      <div className={styles.container}>
        <Space split={<div className={styles.sep} />}>
          {NavItems.map((item) => (
            <a
              key={item.name}
              rel={'nofollow'}
              href={item.link}
              target={'_blank'}
              className={styles.nav_item}
            >
              {item.name}
            </a>
          ))}
          <a className={styles.nav_item} onClick={openLocationSelect}>
            Select Location
          </a>
        </Space>

        <Space>
          <UserNavs />
          <div className={styles.nav_item}>
            <MiniCart />
          </div>
        </Space>
      </div>
    </div>
  );
}
