interface Order {
  id: number;
  status: string;
  shippingInfo: ShippingInfo;
  products: CartProduct[];
  productsAmount: number;
  discount: number;
  expressFee: number;
  paymentMethod: string;
  paymentAmount: number;
  createTime: string;
}

export const orders: Order[] = [
  {
    id: 5230601985602776,
    status: '已收货',
    shippingInfo: {
      id: 1,
      username: '海盐芝士不加糖',
      phoneNumber: '189****2398',
      address: ['重庆市 江北区 马栏星镇', '一心村']
    },
    products: [
      {
        id: 1,
        name: 'Xiaomi 11 青春版 8GB+256GB 清凉薄荷',
        pictureUrl:
          'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1617014232.08725811.jpg',
        price: 2099,
        number: 1
      },
      {
        id: 2,
        name: '小米33W充电器 白色',
        pictureUrl:
          'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1615343278.87026928.jpg',
        price: 39,
        number: 1
      }
    ],
    productsAmount: 2138,
    discount: 9.99,
    expressFee: 0,
    paymentAmount: 2128.01,
    paymentMethod: '微信支付',
    createTime: '2023-06-01 14:59:57'
  },
  {
    id: 5230601985602777,
    status: '待发货',
    shippingInfo: {
      id: 1,
      username: '海盐芝士不加糖',
      phoneNumber: '189****2398',
      address: ['重庆市 江北区 马栏星镇', '一心村']
    },
    products: [
      {
        id: 1,
        name: 'Xiaomi 11 青春版 8GB+256GB 清凉薄荷',
        pictureUrl:
          'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1617014232.08725811.jpg',
        price: 2099,
        number: 1
      },
      {
        id: 2,
        name: '小米33W充电器 白色',
        pictureUrl:
          'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1615343278.87026928.jpg',
        price: 39,
        number: 1
      }
    ],
    productsAmount: 2138,
    discount: 0.99,
    expressFee: 0,
    paymentAmount: 2137.01,
    paymentMethod: '支付宝支付',
    createTime: '2023-06-02 14:59:57'
  }
];
