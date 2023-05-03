import LogoIcon from '@/assets/logo.png';
import { NavLink } from 'react-router-dom';
import { ProductCategories } from './const';
import styles from './index.module.less';
import SearchBar from './SearchBar';

export default function MainHeader() {
  return (
    <div className={styles.container}>
      <NavLink to={'/'} style={{ width: '23.4rem' }}>
        <img src={LogoIcon} className={styles.logo_icon} alt={'logo'} />
      </NavLink>
      <CategoryBar />
      <SearchBar />
    </div>
  );
}

function CategoryBar() {
  return (
    <div className={styles.category_bar}>
      {ProductCategories.map((item) => (
        <a
          key={item.label}
          className={styles.label}
          href={item.href}
          target={'_blank'}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
