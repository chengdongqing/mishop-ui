import CommendedProducts from '@/components/CommendedProducts';
import MiniHeader from '@/components/MiniHeader';
import EmptyCart from './EmptyCart';
import styles from './index.module.less';
import MainCart from './MainCart';
import { useIsEmptyCart } from './MainCart/helpers.ts';

export default function ShoppingCartPage() {
  const isEmptyCart = useIsEmptyCart();

  return (
    <>
      <MiniHeader
        title={'我的购物车'}
        extra={
          !isEmptyCart &&
          '温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算'
        }
      />
      <div style={{ backgroundColor: 'var(--color-background)' }}>
        <div className={styles.container}>
          {isEmptyCart ? <EmptyCart /> : <MainCart />}
          <CommendedProducts
            title={!isEmptyCart ? '买购物车中商品的人还买了' : '为您推荐'}
          />
        </div>
      </div>
    </>
  );
}
