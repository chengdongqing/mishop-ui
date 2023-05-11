import popup from '@/components/Popup';
import { CartProduct } from '@/pages/Cart';
import { useMemo } from 'react';

export default function useCart(
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
    popup.confirm('确认删除所选商品吗？', {
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
