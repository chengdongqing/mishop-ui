import request from '@/utils/request.ts';

export function fetchBanners(type: string) {
  return request<Banner[]>(`/banners/${type}`);
}
