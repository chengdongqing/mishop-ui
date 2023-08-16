import request from '@/utils/request.ts';

export interface ProductReviewStatistics {
  allCount: number;
  satisfiedCount: number;
  satisfactionPercent: number;
  scoresMap: Record<number, number>;
}

export function fetchProductReviewsStatistics(productId: number) {
  return request<ProductReviewStatistics>(
    `/products/${productId}/reviews/statistics`
  );
}

export interface ReviewPageRequestDTO extends Pageable, RecordsType {
  rating?: number;
  withPhotosOnly?: boolean;
}

export interface ProductReviewVO {
  id: number;
  rating: number;
  content?: string;
  photoUrls?: string[];
  userName: string;
  userAvatar: string;
  createdAt: string;
}

export function fetchProductReviewsByPage(
  productId: number,
  params: ReviewPageRequestDTO
) {
  return request<Page<ProductReviewVO>>(
    `/products/${productId}/reviews`,
    {
      params
    }
  );
}
