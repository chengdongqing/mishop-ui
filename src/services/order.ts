import { OrderStatus, PaymentMethod } from '@/pages/Orders/enums.ts';
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
  paymentMethod: keyof typeof PaymentMethod;
  paymentTime: string;
  paymentOrderNumber: string;
  isReviewed: boolean;
  status: keyof typeof OrderStatus;
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

export interface OrdersPageRequestDTO extends Pageable, RecordsType {
  keyword?: string;
  status?: string;
}

export function fetchOrdersByPage(params: OrdersPageRequestDTO) {
  return request<Page<OrderVO>>('/orders', {
    params
  });
}
