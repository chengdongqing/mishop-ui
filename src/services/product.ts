import { SearchProduct } from '@/pages/Search';
import request from '@/utils/request.ts';

export interface ParentProduct extends OptionItem {
  banners: Banner[];
  products: Product[];
  children: ParentProduct[];
}

export function fetchProductBrands(pageSize?: number, productSize?: number) {
  return request<ParentProduct[]>('/products/brands', {
    params: {
      pageSize,
      productSize
    }
  });
}

export function fetchProductCategories(
  pageSize?: number,
  productSize?: number,
  withBanners?: boolean
) {
  return request<ParentProduct[]>('/products/categories', {
    params: {
      pageSize,
      productSize,
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

interface SearchRequestDTO extends Pageable, Record<string, unknown> {
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

export interface RecommendedProduct extends Product {
  skuId: number;
  skuName: string;
  comments: number;
}

export function fetchRecommendedProducts(pageSize?: number) {
  return request<RecommendedProduct[]>('/products/recommended', {
    params: {
      pageSize
    }
  });
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  limits: number;
  brand: string;
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
  pictureUrls: string[];
  attributes: {
    name: string;
    value: string;
  }[];
  available: boolean;
}

export function fetchProductDetails(id: Id) {
  return request<ProductDetails>(`/products/${id}`);
}
