/**
 * 构建商品详情访问地址
 */
export function buildProductUrl(label: string) {
  return '/product/' + label.replace(/\s*/g, '').toLowerCase();
}
