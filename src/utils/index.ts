/**
 * 构建商品详情访问地址
 * @param label 商品名称
 */
export function buildProductUrl(label: string) {
  return '/product/' + label.replace(/\s*/g, '').toLowerCase();
}

/**
 * 金额显示处理函数
 * @param value 值
 * @param unit 单位
 */
export function displayAmount(value: unknown = 0, unit = '元') {
  return typeof value === 'number'
    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + unit
    : '--';
}
