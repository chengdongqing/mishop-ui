import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const OrdersPage = lazy(() => import('@/pages/Orders'));
const CheckoutPage = lazy(() => import('@/pages/Orders/Checkout'));

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
  }
];

export default routes;
