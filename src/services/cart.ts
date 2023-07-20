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
  productLimits?: number;
}

export function fetchCartItems() {
  return request<CartItemVO[]>('/shopping-cart');
}

export function addToCart(item: CartItemVO) {
  return request('/shopping-cart', {
    method: 'POST',
    body: item
  });
}

export function modifyCartItem(itemId: Id, item: CartItemVO) {
  return request(`/shopping-cart/${itemId}`, {
    method: 'PUT',
    body: item
  });
}

export function deleteCartItem(itemId: Id) {
  return request(`/shopping-cart/${itemId}`, {
    method: 'DELETE'
  });
}

export function clearCart() {
  return request('/shopping-cart', {
    method: 'DELETE'
  });
}

export function syncCart(items: CartItemVO[]) {
  return request('/shopping-cart/sync', {
    method: 'POST',
    body: items
  });
}