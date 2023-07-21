import useCartActions from '@/hooks/useCartActions.ts';
import { CartItemVO } from '@/services/cart.ts';
import { useCartItems } from '@/store/slices/cartSlice.ts';
import Decimal from 'decimal.js';
import { useMemo } from 'react';

export function useCartCheck() {
  const products = useCartItems();
  const actions = useCartActions();

  const allChecked = useMemo(() => {
    return products.every((item) => item.isChecked);
  }, [products]);
  const halfChecked = useMemo(() => {
    return products.some((item) => item.isChecked);
  }, [products]);

  function switchCheck(item: CartItemVO | null, isChecked: boolean) {
    const items = (!item ? products : [item]).map((item) => ({
      ...item,
      isChecked
    }));
    actions.modify(items);
  }

  return { allChecked, halfChecked, switchCheck };
}

export function useIsEmptyCart() {
  const products = useCartItems();
  return useMemo(() => !products.length, [products.length]);
}

export function useCartCounter(onlyChecked = true) {
  const products = useCartItems(onlyChecked);

  const totalNumber = useMemo(() => {
    return products.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  }, [products]);

  const totalAmount = useMemo(() => {
    return products.reduce((sum, item) => {
      return new Decimal(sum)
        .plus(new Decimal(item.price).mul(item.quantity))
        .toNumber();
    }, 0);
  }, [products]);

  return { totalNumber, totalAmount };
}
