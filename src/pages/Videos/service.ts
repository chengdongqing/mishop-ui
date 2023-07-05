import request from '@/utils/request.ts';
import { Video } from './index.tsx';

export function fetchVideos(pageSize?: number) {
  return request<Video[]>('/videos', {
    params: {
      pageSize
    }
  });
}
