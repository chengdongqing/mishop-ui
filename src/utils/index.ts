import { EmptyValue } from '@/consts';
import patterns from '@/consts/patterns.ts';

/**
 * 构建商品详情访问地址
 * @param productId 商品id
 */
export function buildProductUrl(productId: number) {
  return '/product/' + productId;
}

export function formatValue(value: unknown, unit = '') {
  return value || value === 0 ? `${value}${unit}` : EmptyValue;
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
  source: RecordsType[],
  apply: (value: RecordsType) => RecordsType = (item) => ({
    [item.name as string]: item.value
  })
) {
  return source.reduce((sum, item) => {
    return Object.assign(sum, apply(item));
  }, {});
}

/**
 * 账号脱敏处理
 * @param account 数据源：手机号/邮箱
 */
export function desensitizeAccount(account: string) {
  let desensitizedData = account;

  if (patterns.email.test(account)) {
    // 处理电子邮件地址
    const parts = account.split('@');
    const username = parts[0];
    const domain = parts[1];
    const usernameLength = username.length;
    const desensitizedUsername = `${username.charAt(0)}${'*'.repeat(
      usernameLength - 2
    )}${username.charAt(usernameLength - 1)}`;
    desensitizedData = `${desensitizedUsername}@${domain}`;
  } else if (patterns.phoneNumber.test(account)) {
    // 处理手机号码
    desensitizedData = `${account.slice(0, 3)}****${account.slice(7)}`;
  }

  return desensitizedData;
}

/**
 * 检查文件格式是否为指定后缀名
 * @param fileName 文件名
 * @param allowedExtensions 允许的后缀名数组
 */
export function checkFileFormat(fileName: string, allowedExtensions: string[]) {
  const fileExtension = fileName.split('.').pop(); // 获取文件的后缀名
  if (!fileExtension) {
    return false; // 如果文件没有后缀名，则认为格式不正确
  }
  // 将后缀名转换为小写形式
  const lowerCaseExtension = fileExtension.toLowerCase();

  // 检查文件后缀名是否在允许的后缀名列表中
  return allowedExtensions.some((extension) => {
    return extension.toLowerCase() === lowerCaseExtension;
  });
}

/**
 * 将blob类型转为file类型
 * @param blob blob二进制数据
 * @param filename 文件名
 */
export function blobToFile(blob: Blob, filename: string) {
  return new File([blob], filename, {
    type: blob.type
  });
}

/**
 * 判断值是否为空
 * @param value 值
 */
export function isBlank(value: unknown) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' ? value.trim().length === 0 : false)
  );
}

export function removeAllSpaces(value: string) {
  return value.replace(/\s/g, '');
}