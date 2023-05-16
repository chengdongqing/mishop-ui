import openAgreementsDeclaring from '@/components/AgreementsDeclaring';
import Logo from '@/components/Logo';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { useIsEmptyCart } from '@/pages/Cart/MainCart/helpers.ts';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';

export default function MiniHeader() {
  const isEmptyCart = useIsEmptyCart();
  const navigate = useNavigate();

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
            <div className={styles.title}>我的购物车</div>
            {!isEmptyCart && (
              <div className={styles.tips}>
                温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算
              </div>
            )}
          </Space>
        </Space>
        <Space
          split={<span style={{ color: '#b0b0b0' }}>|</span>}
          className={styles.links}
        >
          <a
            onClick={() => {
              openAgreementsDeclaring(() => {
                navigate('/login');
              });
            }}
          >
            登录
          </a>
          <a
            onClick={() => {
              openAgreementsDeclaring(() => {
                navigate('/register');
              });
            }}
          >
            注册
          </a>
        </Space>
      </Row>
    </div>
  );
}
