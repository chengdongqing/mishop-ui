import request from '@/utils/request.ts';

export function createOrder(addressId: number) {
  return request<number>('/orders', {
    method: 'POST',
    params: {
      addressId
    }
  });
}

export interface OrderVO {
  id: number;
  orderNumber: string;
  productAmount: number;
  shippingFee: number;
  discountAmount: number;
  paidAmount: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  paymentMethod: string;
  paymentTime: string;
  paymentOrderNumber: string;
  status: string;
  items: OrderItemVO[];
  createdAt: string;
}

export interface OrderItemVO {
  id: number;
  productId: number;
  skuId: number;
  productName: string;
  skuName: string;
  pictureUrl: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

export function fetchOrderInfo(id: number) {
  return request<OrderVO>(`/orders/${id}`);
}

export function requestPayment(id: number, paymentMethod: string) {
  return request<string>(`/orders/payment/${id}/${paymentMethod}`);
}
