import { addToCart, CartItemVO } from '@/services/cart.ts';
import cartSlice from '@/store/slices/cartSlice.ts';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { useDispatch } from 'react-redux';

export default function useCartOperations() {
  const hasLogin = useHasLogin();
  const dispatch = useDispatch();

  function add(item: Omit<CartItemVO, 'quantity' | 'isChecked'>, callback: (res: boolean) => void) {
    const product = {
      ...item,
      quantity: 1,
      isChecked: true
    };

    (hasLogin ? addToCart(product) : Promise.resolve()).then(() => {
      dispatch(
        cartSlice.actions.addToCart({
          product,
          callback
        })
      );
    });
  }

  function modify() {

  }

  function remove() {

  }

  function clear() {

  }

  return { add, modify, remove, clear };
}