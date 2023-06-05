import UserLayout from '@/layouts/UserLayout';
import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const FavoriteProductsPage = lazy(() => import('@/pages/User/Favorites'));
const ShippingAddressesPage = lazy(() => import('@/pages/User/Addresses'));

const routes: RouteObject[] = [
  {
    path: '',
    element: <UserLayout />,
    children: [
      {
        path: 'favorites',
        element: (
          <PageDecorator title={'喜欢的商品'}>
            <FavoriteProductsPage />
          </PageDecorator>
        )
      },
      {
        path: 'addresses',
        element: (
          <PageDecorator title={'收货地址'}>
            <ShippingAddressesPage />
          </PageDecorator>
        )
      }
    ]
  }
];

export default routes;
