/**
 * 字符串去除空格并且转小写
 */
export function toProductUrl(label: string) {
  return '/product/' + label.replace(/\s*/g, '').toLowerCase();
}
