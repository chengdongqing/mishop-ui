import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const OrdersPage = lazy(() => import('@/pages/Orders'));

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <PageDecorator title={'订单列表'}>
        <OrdersPage />
      </PageDecorator>
    )
  },
];

export default routes;
