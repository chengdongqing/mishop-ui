import popup from '@/components/Popup';
import { useAppSelector } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { products: CartProduct[] } = {
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
        product: CartProduct;
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
          prevProduct.limits &&
          prevProduct.number + product.number > prevProduct.limits
        ) {
          popup.alert('商品加入购物车数量超过限购数');
          callback(false);
        } else {
          prevProduct.number += product.number;
          callback(true);
        }
      }
    },
    removeProduct({ products }, { payload }: PayloadAction<{ skuId: Id }>) {
      const index = products.findIndex((item) => item.skuId === payload.skuId);
      if (index !== -1) {
        products.splice(index, 1);
      }
    },
    removeProducts(
      state,
      { payload }: PayloadAction<{ skuIds?: Id[]; allChecked?: boolean }>
    ) {
      const { products } = state;
      if (payload.allChecked) {
        state.products = products.filter((item) => !item.checked);
      } else if (payload.skuIds?.length) {
        state.products = products.filter((item) => {
          return !payload.skuIds?.includes(item.skuId);
        });
      }
    },
    modifyProductNumber(
      { products },
      { payload }: PayloadAction<{ skuId: Id; number: number }>
    ) {
      const { skuId, number } = payload;

      const index = products.findIndex((item) => item.skuId === skuId);
      if (index !== -1) {
        // 判断是否超出限购数量
        const prevProduct = products[index];
        if (prevProduct.limits !== -1 && number > prevProduct.limits) {
          popup.alert('商品加入购物车数量超过限购数');
        } else {
          products[index].number = number;
        }
      }
    },
    modifyProductCheck(
      { products },
      { payload }: PayloadAction<{ skuId: Id; checked: boolean }>
    ) {
      const index = products.findIndex((item) => item.name === payload.skuId);
      if (index !== -1) {
        products[index].checked = payload.checked;
      }
    },
    modifyProductsCheck(
      { products },
      { payload }: PayloadAction<{ checked: boolean }>
    ) {
      products.forEach((item) => {
        item.checked = payload.checked;
      });
    },
    setCart(state, { payload }: PayloadAction<CartProduct[]>) {
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
    return onlyChecked ? products.filter((item) => item.checked) : products;
  });
}
