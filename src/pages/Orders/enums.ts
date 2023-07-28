export enum OrderStatus {
  PENDING_PAYMENT = '待支付',
  PENDING_PACKING = '待配货',
  PENDING_SHIPPING = '待出库',
  PENDING_RECEIVING = '待收货',
  COMPLETED = '已完成',
  CANCELED = '已取消'
}

export enum PaymentMethod {
  ALIPAY = '支付宝',
  WECHAT = '微信'
}
