import { SearchProduct } from '@/pages/Search';
import request from '@/utils/request.ts';

export function fetchProductBrands(pageSize?: number, productSize?: number) {
  return request<OptionItem[]>('/products/brands', {
    params: {
      pageSize,
      productSize
    }
  });
}

export function fetchProductCategories(pageSize?: number, productSize?: number) {
  return request<OptionItem[]>('/products/categories', {
    params: {
      pageSize,
      productSize
    }
  });
}

export function fetchHotProducts() {
  return request('/products/hot-products');
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