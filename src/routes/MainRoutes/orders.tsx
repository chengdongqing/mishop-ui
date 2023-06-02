import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const OrdersPage = lazy(() => import('@/pages/Orders'));
const CheckoutPage = lazy(() => import('@/pages/Orders/Checkout'));
const PayPage = lazy(() => import('@/pages/Orders/Pay'));
const PageSuccessfulPage = lazy(() => import('@/pages/Orders/Pay/Successful'));

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <PageDecorator title={'订单列表'}>
        <OrdersPage />
      </PageDecorator>
    )
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
            <PageSuccessfulPage />
          </PageDecorator>
        )
      }
    ]
  }
];

export default routes;
