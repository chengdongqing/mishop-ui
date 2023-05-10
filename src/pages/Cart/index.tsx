import Button from '@/components/Button';
import CommendedProducts from '@/components/CommendedProducts';
import Row from '@/components/Row';
import Space from '@/components/Space';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const hasLogin = false;

export default function CartPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={styles.container}>
        <EmptyCart />

        <CommendedProducts title={'为您推荐'} mode={'static'} />
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <Row align={'middle'} justify={'center'} className={styles.cart_empty}>
      <img
        src={
          'https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/cart/cart-empty.png'
        }
        alt={'empty cart'}
      />
      <div className={styles.content}>
        <div className={styles.tips}>您的购物车还是空的！</div>
        {!hasLogin && (
          <div className={styles.desc}>登录后将显示您之前加入的商品</div>
        )}
        <div className={styles.btn_group}>
          {!hasLogin ? (
            <Space size={'1rem'}>
              <Link to={'/login'}>
                <Button className={styles.btn}>立即登录</Button>
              </Link>
              <Link to={'/search'}>
                <Button
                  className={classNames(styles.btn, styles.gray)}
                  outlined
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
