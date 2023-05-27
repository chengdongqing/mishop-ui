export const FilterBarItems: {
  label: string;
  value: string;
  children: OptionItem[];
}[] = [
  {
    label: '品牌',
    value: 'brand',
    children: [
      {
        label: '小米',
        value: 1
      },
      {
        label: 'Redmi',
        value: 2
      },
      {
        label: '米家',
        value: 3
      }
    ]
  },
  {
    label: '类别',
    value: 'category',
    children: [
      {
        label: '手机',
        value: 1
      },
      {
        label: '电脑',
        value: 2
      },
      {
        label: '家电',
        value: 3
      },
      {
        label: '手机',
        value: 4
      },
      {
        label: '电脑',
        value: 5
      },
      {
        label: '家电',
        value: 6
      },
      {
        label: '手机',
        value: 7
      },
      {
        label: '电脑',
        value: 8
      },
      {
        label: '家电',
        value: 9
      },
      {
        label: '手机',
        value: 10
      },
      {
        label: '电脑',
        value: 11
      },
      {
        label: '家电',
        value: 12
      },
      {
        label: '手机',
        value: 13
      },
      {
        label: '电脑',
        value: 14
      },
      {
        label: '家电',
        value: 15
      },
      {
        label: '手机',
        value: 16
      },
      {
        label: '电脑',
        value: 17
      },
      {
        label: '家电',
        value: 18
      }
    ]
  }
];

export type ProductItemProps = Omit<Product, 'pictureUrl'> & {
  pictureUrls: string[];
};

export const Products: ProductItemProps[] = [
  {
    pictureUrls: [
      'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1682993596.13856241.png',
      'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1682993596.1379484.png',
      'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1682993596.25086880.png'
    ],
    label: 'Xiaomi 13 Ultra',
    originalPrice: 6499,
    price: 5999
  },
  {
    pictureUrls: [
      'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1679982565.14646441.png',
      'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1679982565.1181124.png',
      'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1679982565.11927388.png'
    ],
    label: 'Redmi Note 12 Turbo',
    price: 2599
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211292354_3561d2993d555486f6504a7c37b62439.png'
    ],
    label: 'Xiaomi 12 Ultra',
    originalPrice: 6499,
    price: 5999
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d13f434be6b12bd9b5486247425eca6f.png'
    ],
    label: 'Redmi Note 11 Turbo',
    originalPrice: 2799,
    price: 2599
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211021733_dd9277a89d08e6cc94f823ad99a7d4bc.png'
    ],
    label: '米家空调 清凉版 大1匹（单冷）',
    originalPrice: 2099,
    price: 1599
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262033_d865bffadb8d831a749a65a4bf00eeb3.png'
    ],
    label: 'Redmi Note 10 Turbo',
    originalPrice: 2799,
    price: 2599
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212301043_d2a4c1a6590058c6a0348d2937a069c5.png'
    ],
    label: 'Xiaomi 10 Ultra',
    originalPrice: 6499,
    price: 5999
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202205221513_4a54fc6db0b3bb27b77c5bab1d11b26d.png'
    ],
    label: 'Redmi Note 9 Turbo',
    originalPrice: 2799,
    price: 2599
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212261455_f37dd30477e7ba040c7fb69c31ad8bf3.png'
    ],
    label: 'Xiaomi 9 Ultra',
    originalPrice: 6499,
    price: 5999
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4257d435e77ec82bb6922e83b9bf5bcc.png'
    ],
    label: 'Redmi Note 8 Turbo',
    originalPrice: 2799,
    price: 2599
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212261018_0724441516a1608696413107bcf58253.png'
    ],
    label: 'Xiaomi 8 Ultra',
    originalPrice: 6499,
    price: 5999
  },
  {
    pictureUrls: [
      'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211292352_b92e2a148fb29f213055484a98004830.png'
    ],
    label: 'Redmi Note 7 Turbo',
    originalPrice: 2799,
    price: 2599
  }
];
