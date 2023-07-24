import { ProductCommentItem } from '@/pages/Product/Comments';
import request from '@/utils/request.ts';

export interface ProductCommentStatistics {
  numberOfAll: number;
  numberOfSatisfied: number;
  percentOfSatisfaction: number;
  scoresMap: Record<number, number>;
}

export function fetchCommentsStatistics(productId: number) {
  return request<ProductCommentStatistics>(
    `/products/${productId}/comments/statistics`
  );
}

export interface CommentsPageRequestDTO extends Pageable, RecordsType {
  rating?: number;
  withPhotosOnly?: boolean;
}

export function fetchCommentsByPage(
  productId: number,
  params: CommentsPageRequestDTO
) {
  return request<Page<ProductCommentItem>>(
    `/products/${productId}/comments/page`,
    {
      params
    }
  );
}
