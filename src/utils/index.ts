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

/**
 * 下载文件
 * @param src 文件访问地址
 * @param filename 保存的文件名
 */
export function downloadFile(src: string, filename: string) {
  const a = document.createElement('a');
  a.download = filename;
  a.href = src;
  a.click();
}

/**
 * 数组转对象
 * @param source 数组源
 * @param apply 处理函数
 */
export function arrayToObject(
  source: Record<string, unknown>[],
  apply: (value: Record<string, unknown>) => Record<string, unknown>
) {
  return source.reduce((sum, item) => {
    return Object.assign(sum, apply(item));
  }, {});
}
