/**
 * 通用值类型
 */
type BasicValue = string | number | boolean | null | undefined;

/**
 * 通用数据模型
 */
interface OptionItem {
  id: BasicValue;
  name: string;
}

/**
 * 通用分页数据模型
 */
interface Page<T> {
  pageNumber?: number;
  pageSize?: number;
  totalSize?: number;
  data?: T[];
}

/**
 * 通用请求分页数据模型
 */
interface Pageable {
  pageNumber: number;
  pageSize?: number;
}

/**
 * 商品数据模型
 */
interface Product {
  id: number;
  // 产品名称
  name: string;
  // 图片地址
  pictureUrl: string;
  // 当前价格
  price: number;
  // 原价
  originalPrice?: number;
  // 产品描述
  description?: string;
  // 好评数量
  comments?: string;
  // 限购数量
  limits?: number;
}

/**
 * 产品类别数据模型
 */
interface ProductCategory {
  label: string;
  children?: Product[];
  href?: string;
}

/**
 * 促销广告图数据模型
 */
interface Promo {
  src: string;
  href: string;
  description?: string;
}

/**
 * 收货信息数据模型
 */
interface ShippingInfo {
  id: number;
  label?: string;
  username: string;
  phoneNumber: string;
  address: string[];
}

/**
 * 登录用户数据模型
 */
interface UserInfo {
  id: number;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
  email?: string;
  gender?: number;
}

/**
 * 购物车商品数据模型
 */
interface CartProduct extends Product {
  checked?: boolean;
  number: number;
}

/**
 * 视频数据模型
 */
interface Video {
  id: number;
  // 视频名称
  name: string;
  // 视频播放地址
  videoUrl: string;
  // 封面图片地址
  coverUrl: string;
  // 视频描述信息
  description?: string;
}