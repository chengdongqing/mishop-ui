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

export function fetchProductCategories(pageSize?: number, productSize?: number, withBanners?: boolean) {
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

interface SearchRequestData {
  categoryId?: number;
  brandId?: number;
  keyword?: string;
  sortBy?: 'new' | 'sales' | 'price-asc' | 'price-desc';
  onlyAvailable?: boolean;
}

export function searchProducts(data?: SearchRequestData, pageable?: Pageable) {
  return request<Page<SearchProduct>>('/products/search', {
    method: 'POST',
    body: data,
    params: { ...pageable }
  });
}

export function fetchRecommendedProducts(pageSize?: number) {
  return request<Product[]>('/products/recommended', {
    params: {
      pageSize
    }
  });
}