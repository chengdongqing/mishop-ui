import { EmptyValue } from './constants';

/**
 * 构建商品详情访问地址
 * @param label 商品名称
 */
export function buildProductUrl(label: string) {
  return '/product/' + label.replace(/\s*/g, '').toLowerCase();
}

/**
 * 格式化金额
 * @param value 值
 * @param unit 单位
 */
export function formatAmount(value: unknown = 0, unit = '元') {
  return typeof value === 'number'
    ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + unit
    : EmptyValue;
}

/**
 * 格式化时间
 * @param seconds 秒数
 */
export function formatTime(seconds: number) {
  if (seconds < 0) return EmptyValue;

  const minutes = Math.floor(seconds / 60);
  const hours = seconds / 60 / 60;

  // 1小时内
  if (minutes < 60) {
    const seconds1 = Math.floor(seconds % 60);
    return `${minutes ? `${minutes}分` : ''}${seconds1}秒`;
  }
  // 一天以上
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const hours1 = Math.round(hours % 24);
    return `${days ? `${days}天` : ''}${hours1 ? `${hours1}时` : ''}`;
  }
  // 一天以内
  const hours1 = Math.floor(hours);
  const minutes1 = Math.floor((hours - hours1) * 60);
  return `${hours1 ? `${hours1}时` : ''}${minutes1 ? `${minutes1}分` : ''}`;
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
  apply: (value: Record<string, unknown>) => Record<string, unknown> = (
    item
  ) => ({
    [item.name as string]: item.value
  })
) {
  return source.reduce((sum, item) => {
    return Object.assign(sum, apply(item));
  }, {});
}
