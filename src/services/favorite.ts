import request from '@/utils/request.ts';

export interface FavoriteProductDTO {
  id: number;
  productId: number;
  skuId: number;
  pictureUrl: string;
  productName: string;
  skuName: string;
  price: number;
}

export default {
  fetchFavorites() {
    return request<FavoriteProductDTO[]>('/favorites');
  },
  existsFavorite(productId: number) {
    return request<boolean>(`/favorites/${productId}`);
  },
  addFavorite(productId: number, skuId: number) {
    return request('/favorites', {
      method: 'POST',
      body: {
        productId,
        skuId
      }
    });
  },
  removeFavorite(productId: number) {
    return request(`/favorites/${productId}`, {
      method: 'DELETE'
    });
  }
};
