import request from '@/utils/request.ts';

export interface CartItemVO {
  id?: Id;
  productId: Id;
  skuId: Id;
  productName: string;
  skuName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
  isChecked: boolean;
  limits?: number;
}

export default {
  fetchCartItems() {
    return request<CartItemVO[]>('/shopping-cart');
  },
  addToCart(item: CartItemVO) {
    return request('/shopping-cart', {
      method: 'POST',
      body: item
    });
  },
  modifyCartItems(items: CartItemVO[]) {
    return request('/shopping-cart', {
      method: 'PUT',
      body: items
    });
  },
  removeCartItems(itemIds: Id[]) {
    return request('/shopping-cart', {
      method: 'DELETE',
      body: itemIds
    });
  },
  syncCart(items: CartItemVO[]) {
    return request('/shopping-cart/sync', {
      method: 'POST',
      body: items
    });
  }
};
