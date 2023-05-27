import { Outlet } from 'react-router-dom';
import styles from './index.module.less';

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <img
        src={
          'https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.92c693b4..jpg'
        }
        alt={''}
        className={styles.side_banner}
      />

      <Outlet />
    </div>
  );
}
