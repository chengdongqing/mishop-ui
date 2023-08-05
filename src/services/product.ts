import { SearchProduct } from '@/pages/Search';
import { CartItemDTO } from '@/services/cart.ts';
import request from '@/utils/request.ts';

export interface ParentProduct extends OptionItem {
  banners: Banner[];
  products: Product[];
  children: ParentProduct[];
}

export function fetchProductBrands(limits?: number, productLimits?: number) {
  return request<ParentProduct[]>('/products/brands', {
    params: {
      limits,
      productLimits
    }
  });
}

export function fetchProductCategories(
  limits?: number,
  productLimits?: number,
  withBanners?: boolean
) {
  return request<ParentProduct[]>('/products/categories', {
    params: {
      limits,
      productLimits,
      withBanners
    }
  });
}

export function fetchHotProducts() {
  return request<string[]>('/products/hot');
}

export function fetchProductNamesLike(keyword: string) {
  return request<string[]>('/products/name-like', {
    params: {
      keyword
    }
  });
}

interface SearchRequestDTO extends Pageable, RecordsType {
  categoryId?: number;
  brandId?: number;
  keyword?: string;
  sortBy?: string;
  onlyAvailable?: boolean;
}

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
