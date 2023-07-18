import request from '@/utils/request.ts';

export interface Token {
  accessToken: string;
  refreshToken: string;
  expireIn: string;
}

export interface AuthVO {
  id: number;
  name: string;
  gender?: number;
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

export function loginWithVerificationCode(params: LoginDTOWithVerificationCode) {
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
  return request<AuthVO>('/auth/register', {
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
  return request('/auth/reset-password', {
    method: 'POST',
    params
  });
}

export function sendVerificationCode(recipient: string) {
  return request('/auth/send/verification-code', {
    method: 'POST',
    params: {
      recipient
    }
  })
}

export function refreshToken(refreshToken: string) {
  return request<Token>('/auth/refresh-token', {
    method: 'POST',
    body: refreshToken
  });
}