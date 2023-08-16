import { CartItemDTO } from '@/services/cart.ts';
import request from '@/utils/request.ts';

export interface ParentProduct extends OptionItem {
  items: Product[];
  banners: Banner[];
  children: ParentProduct[];
}

export function fetchProductBrands(limits?: number, itemsLimits?: number) {
  return request<ParentProduct[]>('/products/brands', {
    params: {
      limits,
      itemsLimits
    }
  });
}

export function fetchProductCategories(
  limits?: number,
  itemsLimits?: number,
  withBanners?: boolean
) {
  return request<ParentProduct[]>('/products/categories', {
    params: {
      limits,
      itemsLimits,
      withBanners
    }
  });
}

export function fetchHotProducts() {
  return request<string[]>('/products/names/hot');
}

export function fetchProductNamesLike(keyword: string) {
  return request<string[]>('/products/names/like', {
    params: {
      keyword
    }
  });
}

export interface SearchRequestDTO extends Pageable, RecordsType {
  categoryId?: number;
  brandId?: number;
  keyword?: string;
  sortBy?: string;
  onlyAvailable?: boolean;
}

export type SearchProduct = Product & {
  gallery: string[];
};

export function searchProducts(params: SearchRequestDTO) {
  return request<Page<SearchProduct>>('/products/search', {
    params
  });
}

export interface RecommendedProduct extends CartItemDTO {
  originalPrice?: number;
  reviews: number;
}

export function fetchRecommendedProducts(limits?: number) {
  return request<RecommendedProduct[]>('/products/recommended', {
    params: {
      limits
    }
  });
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  limits: number;
  brandName: string;
  categoryName: string;
  staticDetails?: {
    name: string;
    children: string[];
  }[];
  skus: ProductSKU[];
}

export interface ProductSKU {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  pictureUrl: string;
  gallery: string[];
  attributes: {
    name: string;
    value: string;
  }[];
  available: boolean;
}

export function fetchProductDetails(id: number) {
  return request<ProductDetails>(`/products/${id}`);
}
