import { CartItemVO } from '@/services/cart.ts';
import { useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  cart: CartItemVO[];
} = {
  cart: []
};

export default createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart({ cart }, { payload: cartItem }: PayloadAction<CartItemVO>) {
      // 判断是否已存在该商品
      const index = cart.findIndex((item) => item.skuId === cartItem.skuId);
      if (index === -1) {
        cart.push(cartItem);
      } else {
        const prevProduct = cart[index];
        prevProduct.quantity += cartItem.quantity;
      }
    },
    modifyCartItems({ cart }, { payload: cartItems }: PayloadAction<CartItemVO[]>) {
      cartItems.forEach(item => {
        const { skuId, quantity, isChecked } = item;
        const index = cart.findIndex((item) => item.skuId === skuId);
        if (index !== -1) {
          const cartItem = cart[index];
          cartItem.quantity = quantity;
          cartItem.isChecked = isChecked;
        }
      });
    },
    removeCartItems(state, { payload: skuIds }: PayloadAction<Id[]>) {
      state.cart = state.cart.filter((item) => {
        return !skuIds?.includes(item.skuId);
      });
    },
    setCart(state, { payload }: PayloadAction<CartItemVO[]>) {
      state.cart = payload;
    }
  }
});

export function useCartItems(onlyChecked = false) {
  return useAppSelector((state) => {
    const { cart } = state.cart;
    return onlyChecked ? cart.filter((item) => item.isChecked) : cart;
  });
}
