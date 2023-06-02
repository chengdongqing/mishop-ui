import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const UserLayout = lazy(() => import('@/layouts/UserLayout'));
const OrdersPage = lazy(() => import('@/pages/Orders'));
const OrderDetailsPage = lazy(() => import('@/pages/Orders/Details'));
const OrderCommentsPage = lazy(() => import('@/pages/Orders/Comments'));
const CheckoutPage = lazy(() => import('@/pages/Orders/Checkout'));
const PayPage = lazy(() => import('@/pages/Orders/Pay'));
const PaySuccessfulPage = lazy(() => import('@/pages/Orders/Pay/Successful'));

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <PageDecorator>
        <UserLayout />
      </PageDecorator>
    ),
    children: [
      {
        path: '',
        element: (
          <PageDecorator title={'订单列表'}>
            <OrdersPage />
          </PageDecorator>
        )
      },
      {
        path: ':orderId',
        element: (
          <PageDecorator title={'订单详情'}>
            <OrderDetailsPage />
          </PageDecorator>
        )
      },
      {
        path: 'comments',
        element: (
          <PageDecorator title={'订单评价'}>
            <OrderCommentsPage />
          </PageDecorator>
        )
      }
    ]
  },
  {
    path: 'checkout',
    element: (
      <PageDecorator title={'填写订单信息'}>
        <CheckoutPage />
      </PageDecorator>
    )
  },
  {
    path: 'pay',
    children: [
      {
        path: '',
        element: (
          <PageDecorator title={'支付订单'}>
            <PayPage />
          </PageDecorator>
        )
      },
      {
        path: 'successful/:orderId',
        element: (
          <PageDecorator title={'支付成功'}>
            <PaySuccessfulPage />
          </PageDecorator>
        )
      }
    ]
  }
];

export default routes;
