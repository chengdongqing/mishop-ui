import Button from '@/components/Button';
import Row from '@/components/Row';
import Space from '@/components/Space';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export default function EmptyCart() {
  const hasLogin = useHasLogin();

  return (
    <Row align={'middle'} justify={'center'} className={styles.container}>
      <img
        src={
          'https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/cart/cart-empty.png'
        }
        alt={'empty cart'}
        draggable={false}
      />
      <div className={styles.content}>
        <div className={styles.tips}>您的购物车还是空的！</div>
        {!hasLogin && (
          <div className={styles.desc}>登录后将显示您之前加入的商品</div>
        )}
        <div className={styles.btn_group}>
          {!hasLogin ? (
            <Space size={'1rem'}>
              <Link to={'/auth/login'} state={{ pathname: '/cart' }}>
                <Button className={styles.btn}>立即登录</Button>
              </Link>
              <Link to={'/search'}>
                <Button
                  outlined
                  className={classNames(styles.btn, styles.outlined)}
                >
                  马上去购物
                </Button>
              </Link>
            </Space>
          ) : (
            <Link to={'/search'}>
              <Button className={styles.btn}>马上去购物</Button>
            </Link>
          )}
        </div>
      </div>
    </Row>
  );
}
