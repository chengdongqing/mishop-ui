import popup from '@/components/Popup';
import useDebounce from '@/hooks/useDebounce.ts';
import Decimal from 'decimal.js';
import { RefObject, useEffect, useMemo, useState } from 'react';
import { CartProduct } from '../index';

export function useCart(
  products: CartProduct[],
  onChange: (products: CartProduct[]) => void
) {
  const allChecked = useMemo(() => {
    return products.every((item) => item.checked);
  }, [products]);
  const halfChecked = useMemo(() => {
    return products.some((item) => item.checked);
  }, [products]);

  function switchCheck(index: number, checked: boolean) {
    if (index === -1) {
      //全选/全不选
      const products1 = products.map((item) => ({
        ...item,
        checked: checked
      }));
      onChange([...products1]);
    } else {
      products.splice(index, 1, {
        ...products[index],
        checked
      });
      onChange([...products]);
    }
  }
  function removeItem(index: number) {
    popup.confirm('确定删除所选商品吗？', {
      onOk() {
        products.splice(index, 1);
        onChange([...products]);
      }
    });
  }

  return [
    { allChecked, halfChecked },
    { switchCheck, removeItem }
  ] as const;
}

export function useCartTotal(products: CartProduct[]) {
  const totalNum = useMemo(() => {
    return products.reduce((sum, item) => {
      return item.checked ? sum + item.number : sum;
    }, 0);
  }, [products]);

  const totalAmount = useMemo(() => {
    return products.reduce((sum, item) => {
      return item.checked
        ? new Decimal(sum)
            .plus(new Decimal(item.price).mul(item.number))
            .toNumber()
        : sum;
    }, 0);
  }, [products]);

  return { totalNum, totalAmount };
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
