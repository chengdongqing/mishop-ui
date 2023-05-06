/**
 * 产品模型
 */
declare interface ProductProps {
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
declare interface ProductCategoryProps {
  label: string;
  children?: ProductProps[];
  href?: string;
}

/**
 * 促销广告图模型
 */
declare interface PromoProps {
  src: string;
  href: string;
  description?: string;
}
