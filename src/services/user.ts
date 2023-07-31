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

export function modifyPhoneNumber(phoneNumber: string, verificationCode: string) {
  return request('/user/phone-number', {
    method: 'PUT',
    params: {
      phoneNumber,
      verificationCode
    }
  });
}

export function modifyEmailAddress(emailAddress: string, verificationCode: string) {
  return request('/user/email-address', {
    method: 'PUT',
    params: {
      emailAddress,
      verificationCode
    }
  });
}

export function modifyPassword(password: string) {
  return request('/user/password', {
    method: 'PUT',
    params: {
      password
    }
  });
}

export function deleteAccount() {
  return request('/user', {
    method: 'DELETE'
  });
}