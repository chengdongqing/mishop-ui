import request from '@/utils/request.ts';

export function fetchVideos(limits?: number) {
  return request<Video[]>('/videos', {
    params: {
      limits
    }
  });
}
