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
    return request<FavoriteProductDTO[]>('/users/favorites');
  },
  existsFavorite(productId: number) {
    return request<boolean>(`/users/favorites/${productId}`);
  },
  addFavorite(productId: number, skuId: number) {
    return request('/users/favorites', {
      method: 'POST',
      body: {
        productId,
        skuId
      }
    });
  },
  removeFavorite(productId: number) {
    return request(`/users/favorites/${productId}`, {
      method: 'DELETE'
    });
  }
};
