import { HomeBrickProps } from './Brick';

export const Bricks: HomeBrickProps[] = [
  {
    title: '手机',
    tabs: [
      {
        label: '手机',
        children: [
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202304171459_dd35f1e6215da63c356e352d4d398ce6.png?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Xiaomi 13 Ultra',
            description: '徕卡光学全焦段四摄| 一英寸可变光圈| 徕卡专业街拍模式',
            price: '5999元起'
          },
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8b046feca0a7bb3f7b961a9690babb1b.jpg?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Redmi Note 12 Turbo',
            description: '狂暴引擎 超强性能释放',
            price: '1999元起'
          },
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a6cec580260ceb20ae6a885c2c65c611.png?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Redmi K60',
            description: '骁龙8+｜2K 高光直屏｜5500mAh+67W闪充',
            price: '2499元起',
            originalPrice: '2699元'
          },
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f37dd30477e7ba040c7fb69c31ad8bf3.png?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Redmi K60 Pro',
            description: '第二代骁龙8】狂暴引擎',
            price: '3299元起',
            originalPrice: '3599元'
          },
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202212251443_29b17941a7365948446bd193011d9241.png?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Redmi Note 12 Pro 极速版',
            description: '高通骁龙778G，OLED柔性直屏+一亿像素',
            price: '1699元起'
          },
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202211292351_92aba2c69123166a74ba2e2b525b1ae2.png?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Xiaomi 13 限量定制色',
            description:
              '全新第二代骁龙8｜徕卡专业光学镜头｜徕卡原生双画质 | 6.36″超窄边屏幕｜67W小米澎湃秒充｜徕卡75mm长焦镜头',
            price: '4999元'
          },
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/aa047170a22d9f0852254aa36df5f5f0.png?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Xiaomi 13 Pro',
            description:
              '全新第二代骁龙8｜徕卡专业光学镜头｜徕卡原生双画质 | 2K 专业原色屏｜120W小米澎湃秒充 ｜徕卡75mm长焦镜头',
            price: '4999元起'
          },
          {
            pictureUrl:
              'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/94c6497b70f2e881460cb232082a0da6.png?thumb=1&w=200&h=200&f=webp&q=90',
            label: 'Xiaomi 13',
            description:
              '全新第二代骁龙8｜徕卡专业光学镜头｜徕卡原生双画质 | 6.36″超窄边屏幕｜67W小米澎湃秒充｜徕卡75mm长焦镜头',
            price: '3999元起'
          }
        ]
      }
    ],
    promos: [
      {
        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a5d3a59f7b53c23feab77434aa1f383b.jpg?thumb=1&w=234&h=614&f=webp&q=90',
        href: 'https://www.mi.com/shop/buy?product_id=18443'
      }
    ]
  },
  {
    title: '生活电器',
    tabs: [
      {
        label: '电暖器',
        children: []
      },
      {
        label: '扫地机',
        children: []
      },
      {
        label: '空净',
        children: []
      },
      {
        label: '清洁',
        children: []
      }
    ],
    promos: [
      {
        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c1f1dbfa1f47c2a7d8a0fff6d9930c4a.jpg?thumb=1&w=234&h=300&f=webp&q=90',
        href: 'https://www.mi.com/shop/buy?product_id=16552'
      },
      {
        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/92a420f42eda98f401d650ea9b52409e.jpg?thumb=1&w=234&h=300&f=webp&q=90',
        href: 'https://www.mi.com/shop/buy?product_id=16427'
      }
    ]
  }
];
