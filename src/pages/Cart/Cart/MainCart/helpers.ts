import popup from '@/components/Popup';
import { CartItemVO } from '@/services/cart.ts';
import cartSlice, { useCartProducts } from '@/store/slices/cartSlice.ts';
import Decimal from 'decimal.js';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export function useShoppingCart() {
  const products = useCartProducts();
  const dispatch = useDispatch();

  const allChecked = useMemo(() => {
    return products.every((item) => item.isChecked);
  }, [products]);
  const halfChecked = useMemo(() => {
    return products.some((item) => item.isChecked);
  }, [products]);

  function switchCheck(item: CartItemVO | null, isChecked: boolean) {
    if (!item) {
      //全选/全不选
      dispatch(
        cartSlice.actions.modifyProductsCheck({
          isChecked
        })
      );
    } else {
      dispatch(
        cartSlice.actions.modifyProductCheck({
          skuId: item.skuId,
          isChecked
        })
      );
    }
  }
  function removeItem(item: CartItemVO) {
    popup.confirm('确定删除所选商品吗？', {
      onOk() {
        return new Promise((resolve) => {
          setTimeout(() => {
            dispatch(cartSlice.actions.removeProduct(item));
            resolve();
          }, 500);
        });
      }
    });
  }

  return [
    { allChecked, halfChecked },
    { switchCheck, removeItem }
  ] as const;
}

export function useIsEmptyCart() {
  const products = useCartProducts();
  return useMemo(() => !products.length, [products.length]);
}

export function useCartCounter(onlyChecked = true) {
  const products = useCartProducts();

  const totalNumber = useMemo(() => {
    return products.reduce((sum, item) => {
      return !onlyChecked || (onlyChecked && item.isChecked)
        ? sum + item.quantity
        : sum;
    }, 0);
  }, [onlyChecked, products]);

  const totalAmount = useMemo(() => {
    return products.reduce((sum, item) => {
      return !onlyChecked || (onlyChecked && item.isChecked)
        ? new Decimal(sum)
            .plus(new Decimal(item.price).mul(item.quantity))
            .toNumber()
        : sum;
    }, 0);
  }, [onlyChecked, products]);

  return { totalNumber, totalAmount };
}
