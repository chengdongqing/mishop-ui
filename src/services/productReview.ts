import request from '@/utils/request.ts';

export interface ProductReviewStatistics {
  numberOfAll: number;
  numberOfSatisfied: number;
  percentOfSatisfaction: number;
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
  photos?: string[];
  userName: string;
  userAvatar: string;
  createdAt: string;
}

export function fetchProductReviewsByPage(
  productId: number,
  params: ReviewPageRequestDTO
) {
  return request<Page<ProductReviewVO>>(
    `/products/${productId}/reviews/page`,
    {
      params
    }
  );
}
