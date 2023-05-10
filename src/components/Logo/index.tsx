import LogoIcon from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

export default function Logo() {
  return (
    <Link to={'/'}>
      <img
        alt={'logo'}
        src={LogoIcon}
        draggable={false}
        className={styles.logo_icon}
      />
    </Link>
  );
}
