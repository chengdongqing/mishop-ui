export default class Decimal {
  private value: bigint;
  private scale: number;

  constructor(initialValue: number | string) {
    const stringValue = this.valueOf(initialValue);
    this.scale = this.getScale(stringValue);
    this.value = this.toBigInt(stringValue, this.scale);
  }

  // 静态工厂方法
  static of(initialValue: number | string) {
    return new Decimal(initialValue);
  }

  // 加法
  add(input: number | string) {
    const stringValue = this.valueOf(input);
    const { scale } = this.prepareNumber(stringValue);
    this.scale = Math.max(this.scale, scale);
    this.value += this.toBigInt(stringValue, this.scale);
    return this;
  }

  // 减法
  subtract(input: number | string) {
    const stringValue = this.valueOf(input);
    const { scale } = this.prepareNumber(stringValue);
    this.scale = Math.max(this.scale, scale);
    this.value -= this.toBigInt(stringValue, this.scale);
    return this;
  }

  // 乘法
  multiply(input: number | string) {
    const stringValue = this.valueOf(input);
    const { num, scale } = this.prepareNumber(stringValue);
    this.scale += scale;
    this.value *= num;
    return this;
  }

  // 除法
  divide(input: number | string) {
    const stringValue = this.valueOf(input);
    const { num, scale } = this.prepareNumber(stringValue);
    this.scale -= scale;
    this.value /= num;
    return this;
  }

  // 获取结果（字符串）
  toString() {
    let result = this.value.toString();
    if (this.scale > 0) {
      const integerPart = result.slice(0, -this.scale);
      const decimalPart = result.slice(-this.scale).padEnd(2, '0');
      result = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }
    return result;
  }

  // 获取结果（数值类型）
  toNumber() {
    const resultString = this.toString();
    return Number(resultString);
  }

  // 获取小数点后的位数
  private getScale(num: string): number {
    return num.includes('.') ? num.split('.')[1].length : 0;
  }

  // 转换为 bigint
  private toBigInt(num: string, scale: number): bigint {
    return BigInt(
      num.includes('.') ? num.split('.').join('') : num + '0'.repeat(scale)
    );
  }

  // 准备计算的数字
  private prepareNumber(input: string) {
    const scale = this.getScale(input);
    const num = this.toBigInt(input, scale);
    return { num, scale };
  }

  // 将数值转换为字符串
  private valueOf(input: number | string) {
    return typeof input === 'number' ? input.toString() : input;
  }
}
