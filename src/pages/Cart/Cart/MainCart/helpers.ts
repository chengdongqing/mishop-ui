import useCartActions from '@/hooks/useCartActions.ts';
import { CartItemVO } from '@/services/cart.ts';
import { useCartItems } from '@/store/slices/cartSlice.ts';
import Decimal from 'decimal.js';
import { useMemo } from 'react';

export function useCartItemsCheck(items: CartItemVO[]) {
  const actions = useCartActions();

  const allChecked = useMemo(() => {
    return items.every((item) => item.isChecked);
  }, [items]);
  const halfChecked = useMemo(() => {
    return items.some((item) => item.isChecked) && !allChecked;
  }, [items, allChecked]);

  function switchCheck(item: CartItemVO | null, isChecked: boolean) {
    const newItems = (item ? [item] : items).map((item1) => ({
      ...item1,
      isChecked
    }));
    actions.modifyCartItems(newItems);
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
