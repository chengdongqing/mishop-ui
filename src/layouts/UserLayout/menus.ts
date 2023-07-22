import { HTMLAttributeAnchorTarget } from 'react';

interface MenuItemProps {
  label: string;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  children?: MenuItemProps[];
}

const menus: MenuItemProps[] = [
  {
    label: '订单中心',
    children: [
      {
        label: '我的订单',
        href: '/orders'
      },
      {
        label: '评价晒单',
        href: '/orders/comments'
      }
    ]
  },
  {
    label: '个人中心',
    children: [
      {
        label: '我的个人中心',
        href: '/user'
      },
      {
        label: '喜欢的商品',
        href: '/user/favorites'
      },
      {
        label: '收货地址',
        href: '/user/addresses'
      }
    ]
  },
  {
    label: '账户管理',
    children: [
      {
        label: '个人信息',
        href: '/account',
        target: '_blank'
      },
      {
        label: '修改密码',
        href: '/account?action=password',
        target: '_blank'
      },
      {
        label: '注销服务',
        href: 'https://m.mi.com/userdelete',
        target: '_blank'
      }
    ]
  }
];

export default menus;
