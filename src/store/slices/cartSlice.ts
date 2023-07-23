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
    addToCart({ cart }, { payload }: PayloadAction<CartItemVO>) {
      const existingItem = cart.find((item) => {
        return item.skuId === payload.skuId;
      });
      if (!existingItem) {
        cart.push(payload);
      } else {
        existingItem.quantity += payload.quantity;
      }
    },
    modifyCartItems(
      { cart },
      { payload }: PayloadAction<CartItemVO[]>
    ) {
      payload.forEach((item) => {
        const { skuId, quantity, isChecked } = item;
        const existingItem = cart.find((item) => item.skuId === skuId);
        if (existingItem) {
          existingItem.quantity = quantity;
          existingItem.isChecked = isChecked;
        }
      });
    },
    removeCartItems(state, { payload }: PayloadAction<Id[]>) {
      state.cart = state.cart.filter((item) => {
        return !payload?.includes(item.skuId);
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
