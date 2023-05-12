import CommendedProducts from '@/components/CommendedProducts';
import { createContext, useMemo, useState } from 'react';
import { Products } from './const.ts';
import EmptyCart from './EmptyCart';
import styles from './index.module.less';
import MainCart from './MainCart';

export interface CartProduct extends Omit<Product, 'price'> {
  checked: boolean;
  price: number;
  number: number;
  limitNumber: number;
}

export interface CartContextProps {
  products: CartProduct[];
  onChange: (products: CartProduct[]) => void;
}
export const CartContext = createContext<CartContextProps>({
  products: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange() {}
});

const hasLogin = false;

export default function CartPage() {
  const [products, setProducts] = useState(Products);
  const isEmpty = useMemo(() => products.length === 0, [products.length]);

  return (
    <div style={{ backgroundColor: 'var(--color-background)' }}>
      <div className={styles.container}>
        {isEmpty ? (
          <EmptyCart hasLogin={hasLogin} />
        ) : (
          <CartContext.Provider value={{ products, onChange: setProducts }}>
            <MainCart />
          </CartContext.Provider>
        )}

        <CommendedProducts
          title={hasLogin ? '为您推荐' : '买购物车中商品的人还买了'}
          mode={'static'}
        />
      </div>
    </div>
  );
}
