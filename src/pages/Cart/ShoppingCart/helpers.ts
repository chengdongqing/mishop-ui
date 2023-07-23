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
  const items = useCartItems();
  return useMemo(() => !items.length, [items.length]);
}

export function useCartCounter(onlyChecked = true) {
  const items = useCartItems(onlyChecked);

  const totalNumber = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      return new Decimal(sum)
        .plus(new Decimal(item.price).mul(item.quantity))
        .toNumber();
    }, 0);
  }, [items]);

  return { totalNumber, totalAmount };
}
