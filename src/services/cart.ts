import request from '@/utils/request.ts';

export interface CartItemDTO {
  id?: number;
  productId: number;
  skuId: number;
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
    return request<CartItemDTO[]>('/shopping-cart');
  },
  addToCart(item: CartItemDTO) {
    return request<number>('/shopping-cart', {
      method: 'POST',
      body: item
    });
  },
  modifyCartItems(items: CartItemDTO[]) {
    return request('/shopping-cart', {
      method: 'PUT',
      body: items
    });
  },
  removeCartItems(itemIds: number[]) {
    return request('/shopping-cart', {
      method: 'DELETE',
      body: itemIds
    });
  },
  syncCart(items: CartItemDTO[]) {
    return request('/shopping-cart/sync', {
      method: 'POST',
      body: items
    });
  }
};
