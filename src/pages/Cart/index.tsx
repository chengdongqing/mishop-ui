import CommendedProducts from '@/components/CommendedProducts';
import { useAppSelector } from '@/store';
import EmptyCart from './EmptyCart';
import styles from './index.module.less';
import MainCart from './MainCart';
import { useIsEmptyCart } from './MainCart/helpers.ts';

export interface CartProduct extends Product {
  checked: boolean;
  number: number;
}

export default function ShoppingCartPage() {
  const hasLogin = useAppSelector((state) => !!state.user.userInfo);
  const isEmptyCart = useIsEmptyCart();

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={styles.container}>
        {isEmptyCart ? <EmptyCart hasLogin={hasLogin} /> : <MainCart />}

        <CommendedProducts
          title={hasLogin ? '为您推荐' : '买购物车中商品的人还买了'}
        />
      </div>
    </div>
  );
}
