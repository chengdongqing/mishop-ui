import request from '@/utils/request.ts';

export interface UserActivityStatisticsVO {
  pendingPaymentOrdersCount: number;
  pendingDeliveryOrdersCount: number;
  pendingReviewOrdersCount: number;
  likedProductsCount: number;
}

export function fetchUserActivityStatistics() {
  return request<UserActivityStatisticsVO>('/user/activity-statistics');
}
