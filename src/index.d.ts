/**
 * 通用值类型
 */
declare type BasicValue = string | number | boolean | null | undefined;

/**
 * 通用数据模型
 */
declare interface OptionItem {
  label: string;
  value: BasicValue;
}

/**
 * 产品模型
 */
declare interface Product {
  // 产品名称
  label: string;
  // 图片地址
  pictureUrl: string;
  // 当前价格
  price?: string;
  // 原价
  originalPrice?: string;
  // 产品描述
  description?: string;
}

/**
 * 产品类别模型
 */
declare interface ProductCategory {
  label: string;
  children?: Product[];
  href?: string;
}

/**
 * 促销广告图模型
 */
declare interface Promo {
  src: string;
  href: string;
  description?: string;
}
