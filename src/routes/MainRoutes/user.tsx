import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const UserCenterPage = lazy(() => import('@/pages/User'));
const FavoriteProductsPage = lazy(() => import('@/pages/User/Favorites'));
const ShippingAddressesPage = lazy(() => import('@/pages/User/Addresses'));

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <PageDecorator title={'个人中心'}>
        <UserCenterPage />
      </PageDecorator>
    )
  },
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
];

export default routes;
