import { FormRule } from './FormItem.tsx';

export default function validate(
  value?: unknown,
  rules?: FormRule[]
): Promise<string | void> {
  return new Promise((resolve, reject) => {
    if (!rules) {
      resolve();
      return;
    }
    for (const rule of rules) {
      // 验证非空
      if (
        rule.required &&
        ((!value && value !== 0) || (Array.isArray(value) && !value.length))
      ) {
        reject(rule.message);
        return;
      } else if (value) {
        // 字符串：验证长度
        if (typeof value === 'string') {
          const length = value.toString().length;
          if (
            (rule.len !== undefined && length !== length) ||
            (rule.min !== undefined && length < rule.min) ||
            (rule.max !== undefined && length > rule.max)
          ) {
            reject(rule.message);
            return;
          }
        }
        // 数字：验证大小
        if (typeof value === 'number') {
          if (
            (rule.min !== undefined && value < rule.min) ||
            (rule.max !== undefined && value > rule.max)
          ) {
            reject(rule.message);
            return;
          }
        }
        // 正则表达式
        if (
          rule.pattern &&
          (typeof value === 'string' || typeof value === 'number')
        ) {
          const pattern = new RegExp(rule.pattern);
          if (!pattern.test(value.toString())) {
            reject(rule.message);
            return;
          }
        }
        // 自定义验证规则
        if (rule.validator) {
          return rule
            .validator(value)
            .catch((message) => reject(message))
            .then(() => resolve());
        }
      }
    }
    // 没有错误时
    resolve();
  });
}
