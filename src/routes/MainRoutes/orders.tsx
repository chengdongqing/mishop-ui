import UserLayout from '@/layouts/UserLayout';
import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const OrdersPage = lazy(() => import('@/pages/Orders/Orders'));
const OrderDetailsPage = lazy(() => import('@/pages/Orders/Details'));
const OrderReviewsPage = lazy(() => import('@/pages/Orders/Reviews'));
const PostReviewPage = lazy(() => import('@/pages/Orders/Reviews/Post'));
const CheckoutPage = lazy(() => import('@/pages/Orders/Checkout'));
const PayPage = lazy(() => import('@/pages/Orders/Pay'));
const PaySuccessfullyPage = lazy(() => import('../../pages/Orders/Pay/Successfully'));

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
        path: 'reviews',
        children: [
          {
            path: '',
            element: (
              <PageDecorator title={'订单评价'}>
                <OrderReviewsPage />
              </PageDecorator>
            )
          },
          {
            path: ':orderId',
            element: (
              <PageDecorator title={'服务评价'}>
                <PostReviewPage />
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
    path: 'pay/:id',
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
        path: 'successfully',
        element: (
          <PageDecorator title={'支付成功'}>
            <PaySuccessfullyPage />
          </PageDecorator>
        )
      }
    ]
  }
];

export default routes;
