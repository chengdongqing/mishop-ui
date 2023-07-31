import { Gender } from '@/pages/User/enums.ts';
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

export interface UserProfileDTO extends RecordsType {
  name: string,
  gender: keyof typeof Gender,
  avatarUrl: string
}

export function updateProfile(profile: UserProfileDTO) {
  return request('/user/profile', {
    method: 'PUT',
    body: profile
  });
}