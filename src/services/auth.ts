import { Gender } from '@/pages/User/enums.ts';
import request from '@/utils/request.ts';

export interface Token {
  accessToken: string;
  refreshToken: string;
  expireIn: string;
}

export interface AuthVO {
  id: number;
  name: string;
  gender?: keyof typeof Gender;
  avatarUrl: string;
  phoneNumber: string;
  emailAddress?: string;
  token: Token;
}

export interface LoginDTOWithPassword extends RecordsType {
  account: string;
  password: string;
}

export function loginWithPassword(params: LoginDTOWithPassword) {
  return request<AuthVO>('/auth/login/password', {
    method: 'POST',
    params
  });
}

export interface LoginDTOWithVerificationCode extends RecordsType {
  phoneNumber: string;
  verificationCode: string;
}

export function loginWithVerificationCode(
  params: LoginDTOWithVerificationCode
) {
  return request<AuthVO>('/auth/login/verification-code', {
    method: 'POST',
    params
  });
}

export interface RegisterDTO extends RecordsType {
  phoneNumber: string;
  verificationCode: string;
  password: string;
}

export function register(params: RegisterDTO) {
  return request<AuthVO>('/auth/signup', {
    method: 'POST',
    params
  });
}

export interface ResetPasswordDTO extends RecordsType {
  account: string;
  verificationCode: string;
  newPassword: string;
}

export function resetPassword(params: ResetPasswordDTO) {
  return request('/auth/password/reset', {
    method: 'POST',
    params
  });
}

export function sendVerificationCode(recipient: string) {
  return request<null>('/auth/verification-code', {
    method: 'GET',
    params: {
      recipient
    }
  });
}

export function refreshToken(refreshToken: string) {
  return request<Token>('/auth/token/refresh', {
    method: 'POST',
    body: refreshToken
  });
}
