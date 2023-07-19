import popup from '@/components/Popup';
import { CartItemVO } from '@/services/cart.ts';
import { useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  products: CartItemVO[];
} = {
  products: []
};

export default createSlice({
  name: 'cart',
  initialState,
  reducers: {
    putProduct(
      { products },
      {
        payload
      }: PayloadAction<{
        product: CartItemVO;
        callback: (successful: boolean) => void;
      }>
    ) {
      const { product, callback } = payload;

      // 判断是否已存在该商品
      const index = products.findIndex((item) => item.skuId === product.skuId);
      if (index === -1) {
        products.push(product);
        callback(true);
      } else {
        // 判断是否超出限购数量
        const prevProduct = products[index];
        if (
          prevProduct.productLimits &&
          prevProduct.quantity + product.quantity > prevProduct.productLimits
        ) {
          popup.alert('商品加入购物车数量超过限购数');
          callback(false);
        } else {
          prevProduct.quantity += product.quantity;
          callback(true);
        }
      }
    },
    removeProduct(
      { products },
      {
        payload
      }: PayloadAction<{
        skuId: Id;
      }>
    ) {
      const index = products.findIndex((item) => item.skuId === payload.skuId);
      if (index !== -1) {
        products.splice(index, 1);
      }
    },
    removeProducts(
      state,
      {
        payload
      }: PayloadAction<{
        skuIds?: Id[];
        allChecked?: boolean;
      }>
    ) {
      const { products } = state;
      if (payload.allChecked) {
        state.products = products.filter((item) => !item.isChecked);
      } else if (payload.skuIds?.length) {
        state.products = products.filter((item) => {
          return !payload.skuIds?.includes(item.skuId);
        });
      }
    },
    modifyProductQuantity(
      { products },
      {
        payload
      }: PayloadAction<{
        skuId: Id;
        quantity: number;
      }>
    ) {
      const { skuId, quantity } = payload;

      const index = products.findIndex((item) => item.skuId === skuId);
      if (index !== -1) {
        // 判断是否超出限购数量
        const prevProduct = products[index];
        if (prevProduct.productLimits && quantity > prevProduct.productLimits) {
          popup.alert('商品加入购物车数量超过限购数');
        } else {
          products[index].quantity = quantity;
        }
      }
    },
    modifyProductCheck(
      { products },
      {
        payload
      }: PayloadAction<{
        skuId: Id;
        isChecked: boolean;
      }>
    ) {
      const index = products.findIndex((item) => item.skuId === payload.skuId);
      if (index !== -1) {
        products[index].isChecked = payload.isChecked;
      }
    },
    modifyProductsCheck(
      { products },
      {
        payload
      }: PayloadAction<{
        isChecked: boolean;
      }>
    ) {
      products.forEach((item) => {
        item.isChecked = payload.isChecked;
      });
    },
    setCart(state, { payload }: PayloadAction<CartItemVO[]>) {
      state.products = payload;
    },
    clearCart(state) {
      state.products = [];
    }
  }
});

export function useCartProducts(onlyChecked = false) {
  return useAppSelector((state) => {
    const { products } = state.cart;
    return onlyChecked ? products.filter((item) => item.isChecked) : products;
  });
}
