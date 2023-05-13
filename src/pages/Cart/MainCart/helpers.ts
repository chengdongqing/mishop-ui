import popup from '@/components/Popup';
import useDebounce from '@/hooks/useDebounce.ts';
import useMount from '@/hooks/useMount.ts';
import useUpdateEffect from '@/hooks/useUpdateEffect.ts';
import { useAppSelector } from '@/store';
import cartSlice from '@/store/slices/cartSlice.ts';
import Decimal from 'decimal.js';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CartProduct } from '../index';

export function useCartProducts(onlyChecked = false) {
  return useAppSelector((state) => {
    const { products } = state.cart;
    return onlyChecked ? products.filter((item) => item.checked) : products;
  });
}

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
          label: item.label,
          checked
        })
      );
    }
  }
  function removeItem(item: CartProduct) {
    popup.confirm('确定删除所选商品吗？', {
      onOk() {
        dispatch(cartSlice.actions.removeProduct(item));
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

const CacheKey = 'ShoppingCart';
export function useCartInitial() {
  const products = useCartProducts();
  const dispatch = useDispatch();

  useMount(() => {
    const data = window.localStorage.getItem(CacheKey);
    if (data) {
      dispatch(cartSlice.actions.setCart(JSON.parse(data)));
    }
  });

  useUpdateEffect(() => {
    window.localStorage.setItem(CacheKey, JSON.stringify(products));
  }, [products]);
}

export function useFooterFixed(
  footerRef: RefObject<HTMLDivElement>,
  deps: unknown[] = []
) {
  const [fixed, setFixed] = useState(false);

  const onScroll = useDebounce(() => {
    setFixed(
      (footerRef.current as HTMLDivElement).getBoundingClientRect().bottom >=
        window.innerHeight
    );
  }, 50);

  useEffect(() => {
    onScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  });

  return fixed;
}
