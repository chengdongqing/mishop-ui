import useCartActions from '@/hooks/useCartActions.ts';
import useLatest from '@/hooks/useLatest.ts';
import { CartItemDTO } from '@/services/cart.ts';
import { useCartItems } from '@/store/slices/cartSlice.ts';
import Decimal from '@/utils/decimal.ts';
import { useMemo } from 'react';

export function useCartItemsCheck(items: CartItemDTO[]) {
  const itemsRef = useLatest(items);
  const actions = useCartActions();

  const allChecked = useMemo(() => {
    return items.every((item) => item.isChecked);
  }, [items]);
  const halfChecked = useMemo(() => {
    return items.some((item) => item.isChecked) && !allChecked;
  }, [items, allChecked]);

  function switchCheck(item: CartItemDTO | null, isChecked: boolean) {
    const newItems = (item ? [item] : itemsRef.current).map((item1) => ({
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
      return Decimal.of(sum)
        .add(Decimal.of(item.price).multiply(item.quantity).toString())
        .toNumber();
    }, 0);
  }, [items]);

  return { totalNumber, totalAmount };
}
