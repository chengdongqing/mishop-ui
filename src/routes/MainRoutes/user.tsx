import UserLayout from '@/layouts/UserLayout';
import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const FavoriteProductsPage = lazy(() => import('@/pages/User/Favorites'));

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
      }
    ]
  }
];

export default routes;
