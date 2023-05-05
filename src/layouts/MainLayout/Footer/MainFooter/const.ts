export const Services = [
  {
    label: '预约维修服务',
    icon: 'i-tool',
    href: 'https://www.mi.com/service/aftersale/front'
  },
  {
    label: '7天无理由退货',
    icon: 'i-seven',
    href: 'https://www.mi.com/service/exchange#back'
  },
  {
    label: '15天免费换货',
    icon: 'i-fifteen',
    href: 'https://www.mi.com/service/exchange#back'
  },
  {
    label: '满69元包邮',
    icon: 'i-gift',
    href: 'https://www.mi.com/service/buy/Postal%20policy'
  },
  {
    label: '1100余家售后网点',
    icon: 'i-location',
    href: 'https://www.mi.com/service/sitelist'
  }
];

interface LinksProps {
  label: string;
  children: {
    label: string;
    href?: string;
    open?: string;
  }[];
}
export const Links: LinksProps[] = [
  {
    label: '选购指南',
    children: [
      {
        label: '手机'
      },
      {
        label: '电视'
      },
      {
        label: '笔记本'
      },
      {
        label: '平板'
      },
      {
        label: '穿戴'
      },
      {
        label: '耳机'
      },
      {
        label: '家电'
      },
      {
        label: '路由器'
      },
      {
        label: '音箱'
      },
      {
        label: '配件'
      }
    ]
  },
  {
    label: '服务中心',
    children: [
      {
        label: '申请售后'
      },
      {
        label: '售后政策'
      },
      {
        label: '维修服务价格'
      },
      {
        label: '订单查询'
      },
      {
        label: '以旧换新'
      },
      {
        label: '保障服务'
      },
      {
        label: '防伪查询'
      },
      {
        label: 'F码通道'
      }
    ]
  },
  {
    label: '线下门店',
    children: [
      {
        label: '小米之家'
      },
      {
        label: '服务网点'
      },
      {
        label: '授权体验店/专区'
      }
    ]
  },
  {
    label: '关于小米',
    children: [
      {
        label: '了解小米'
      },
      {
        label: '加入小米'
      },
      {
        label: '投资者关系'
      },
      {
        label: '可持续发展'
      },
      {
        label: '廉洁举报'
      }
    ]
  },
  {
    label: '关注我们',
    children: [
      {
        label: '新浪微博'
      },
      {
        label: '官方微信',
        open: 'wechat'
      },
      {
        label: '联系我们'
      },
      {
        label: '公益基金会'
      }
    ]
  }
];
