import popup from '@/components/Popup';
import cartSlice, { useCartProducts } from '@/store/slices/cartSlice.ts';
import Decimal from 'decimal.js';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export function useCart() {
  const products = useCartProducts();
  const dispatch = useDispatch();

  const allChecked = useMemo(() => {
    return products.every((item) => item.checked);
  }, [products]);
  const halfChecked = useMemo(() => {
    return products.some((item) => item.checked);
  }, [products]);

  function switchCheck(item: CartProduct | null, checked: boolean) {
    if (!item) {
      //全选/全不选
      dispatch(
        cartSlice.actions.modifyProductsCheck({
          checked
        })
      );
    } else {
      dispatch(
        cartSlice.actions.modifyProductCheck({
          label: item.name,
          checked
        })
      );
    }
  }
  function removeItem(item: CartProduct) {
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
      return !onlyChecked || (onlyChecked && item.checked)
        ? sum + item.number
        : sum;
    }, 0);
  }, [onlyChecked, products]);

  const totalAmount = useMemo(() => {
    return products.reduce((sum, item) => {
      return !onlyChecked || (onlyChecked && item.checked)
        ? new Decimal(sum)
            .plus(new Decimal(item.price).mul(item.number))
            .toNumber()
        : sum;
    }, 0);
  }, [onlyChecked, products]);

  return { totalNumber, totalAmount };
}
