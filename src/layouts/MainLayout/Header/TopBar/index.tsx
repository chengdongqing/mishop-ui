import openAgreementsDeclaring from '@/components/AgreementsDeclaring';
import openLocationSelect from '@/components/LocationSelect';
import Space from '@/components/Space';
import { useNavigate } from 'react-router-dom';
import { NavItems } from './const';
import styles from './index.module.less';
import MiniCart from './MiniCart';

export default function TopBar() {
  const navigate = useNavigate();

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
          <Space split={<div className={styles.sep} />}>
            <a
              className={styles.nav_item}
              onClick={() => {
                openAgreementsDeclaring(() => {
                  navigate('/auth/login');
                });
              }}
            >
              登录
            </a>
            <a
              className={styles.nav_item}
              onClick={() => {
                openAgreementsDeclaring(() => {
                  navigate('/auth/register');
                });
              }}
            >
              注册
            </a>
          </Space>
          <div className={styles.nav_item}>
            <MiniCart />
          </div>
        </Space>
      </div>
    </div>
  );
}
