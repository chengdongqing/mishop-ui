import request from '@/utils/request.ts';

/**
 * 视频数据模型
 */
export interface Video {
  id: number;
  // 视频名称
  name: string;
  // 视频播放地址
  videoUrl: string;
  // 封面图片地址
  coverUrl: string;
  // 视频描述信息
  description?: string;
}

export function fetchVideos(limits?: number) {
  return request<Video[]>('/videos', {
    params: {
      limits
    }
  });
}
