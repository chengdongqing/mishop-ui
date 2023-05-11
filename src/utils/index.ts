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

function calcMathValue(
  a: number,
  b: number,
  operation: (a: number, b: number) => number
) {
  const [a1, b1] = [a, b].map((item) => item * 100);
  return operation(a1, b1);
}
/**
 * 基本数学运算相关函数
 */
export const MathOperation = {
  plus(a: number, b: number) {
    return calcMathValue(a, b, (a1, b1) => (a1 + b1) / 100);
  },
  minus(a: number, b: number) {
    return calcMathValue(a, b, (a1, b1) => (a1 - b1) / 100);
  },
  multiply(a: number, b: number) {
    return calcMathValue(a, b, (a1, b1) => (a1 * b1) / 10000);
  },
  divide(a: number, b: number) {
    return calcMathValue(a, b, (a1, b1) => a1 / b1);
  }
};
