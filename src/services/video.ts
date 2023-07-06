import request from '@/utils/request.ts';

export function fetchVideos(pageSize?: number) {
  return request<Video[]>('/videos', {
    params: {
      pageSize
    }
  });
}
