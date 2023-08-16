import { OrderItemVO } from '@/services/order.ts';
import request from '@/utils/request.ts';

export interface PendingReviewOrderVO {
  orderId: number;
  orderNumber: string;
  orderAt: string;
  paidAmount: number;
  items: OrderItemVO[];
}

export function fetchPendingReviewOrders() {
  return request<PendingReviewOrderVO[]>('/orders/reviews/pending');
}

export interface OrderReviewVO extends RecordsType {
  orderId: number;
  packagingRating?: number;
  speedRating?: number;
  serviceRating?: number;
  content?: string;
  photos?: string[];
  isAnonymous?: boolean;
  items: OrderItemReviewVO[];
}

interface OrderItemReviewVO extends RecordsType{
  id: number;
  name: string;
  pictureUrl: string;
  rating?: number;
  content?: string;
  photos?: string[];
  isAnonymous?: boolean;
}

export function fetchOrderReview(orderId: number) {
  return request<OrderReviewVO>(`/orders/reviews/${orderId}`);
}

export interface OrderReviewDTO extends RecordsType {
  packagingRating: number;
  speedRating: number;
  serviceRating: number;
  content?: string;
  photoUrls?: string[];
  isAnonymous: boolean;
}

export function createOrderReview(
  orderId: number,
  orderReviewDTO: OrderReviewDTO
) {
  return request(`/orders/reviews/${orderId}`, {
    method: 'POST',
    body: orderReviewDTO
  });
}

export interface ProductReviewDTO extends RecordsType {
  rating: number;
  content?: string;
  photoUrls?: string[];
  isAnonymous: boolean;
}

export function createProductReview(
  orderId: number,
  productId: number,
  productReviewDTO: ProductReviewDTO
) {
  return request(`/orders/reviews/${orderId}/${productId}`, {
    method: 'POST',
    body: productReviewDTO
  });
}
