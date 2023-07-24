type BasicValue = string | number | boolean | null | undefined;
type RecordsType = Record<string, unknown>;

/**
 * 通用数据模型
 */
interface OptionItem {
  id: number;
  name: string;
}

/**
 * 通用分页响应数据模型
 */
interface Page<T> {
  pageNumber: number;
  pageSize: number;
  totalSize: number;
  totalPages: number;
  data: T[];
}

/**
 * 通用分页请求数据模型
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
  // 限购数量
  limits: number;
}

/**
 * 广告图数据模型
 */
interface Banner {
  id: number;
  src: string;
  href: string;
  target?: '_blank' | '_self';
}

/**
 * 登录用户数据模型
 */
interface LoginUser {
  id: number;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
  email?: string;
  gender?: number;
  token: {
    accessToken: string;
    refreshToken: string;
    expireIn: string;
  };
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
