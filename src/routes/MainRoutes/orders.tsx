import UserLayout from '@/layouts/UserLayout';
import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const OrdersPage = lazy(() => import('@/pages/Orders/Orders'));
const OrderDetailsPage = lazy(() => import('@/pages/Orders/Details'));
const OrderCommentsPage = lazy(() => import('@/pages/Orders/Comments'));
const PostCommentPage = lazy(() => import('@/pages/Orders/Comments/Post'));
const CheckoutPage = lazy(() => import('@/pages/Orders/Checkout'));
const PayPage = lazy(() => import('@/pages/Orders/Pay'));
const PaySuccessfulPage = lazy(() => import('@/pages/Orders/Pay/Successful'));

const routes: RouteObject[] = [
  {
    path: '',
    element: <UserLayout />,
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
        children: [
          {
            path: '',
            element: (
              <PageDecorator title={'订单评价'}>
                <OrderCommentsPage />
              </PageDecorator>
            )
          },
          {
            path: ':orderId',
            element: (
              <PageDecorator title={'服务评价'}>
                <PostCommentPage />
              </PageDecorator>
            )
          }
        ]
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
