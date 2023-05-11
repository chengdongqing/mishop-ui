import LocationSelect from '@/components/LocationSelect';
import Space from '@/components/Space';
import useToggle from '@/hooks/useToggle.ts';
import { Link } from 'react-router-dom';
import { NavItems } from './const';
import styles from './index.module.less';
import MiniCart from './MiniCart';

export default function TopBar() {
  const [locationsOpen, toggleLocationsOpen] = useToggle();

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
          <a
            className={styles.nav_item}
            onClick={() => {
              toggleLocationsOpen();
            }}
          >
            Select Location
          </a>
        </Space>

        <Space>
          <Space split={<div className={styles.sep} />}>
            <Link to={'/login'} className={styles.nav_item}>
              登录
            </Link>
            <Link to={'/register'} className={styles.nav_item}>
              注册
            </Link>
          </Space>
          <div className={styles.nav_item}>
            <MiniCart />
          </div>
        </Space>
      </div>

      <LocationSelect
        open={locationsOpen}
        onCancel={() => {
          toggleLocationsOpen();
        }}
      />
    </div>
  );
}
