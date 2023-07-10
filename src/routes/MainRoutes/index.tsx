import UserLayout from '@/layouts/UserLayout';
import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import ordersRoutes from './orders';
import productRoutes from './product';
import userRoutes from './user';

const HomePage = lazy(() => import('@/pages/Home'));
const VideosPage = lazy(() => import('@/pages/Videos'));
const SearchPage = lazy(() => import('@/pages/Search'));
const ProductPage = lazy(() => import('@/pages/Product'));
const CartPage = lazy(() => import('@/pages/Cart/Cart'));
const CartSuccessfulPage = lazy(() => import('@/pages/Cart/Successful'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PageDecorator title={'首页'}>
        <HomePage />
      </PageDecorator>
    )
  },
  {
    path: '/videos',
    element: (
      <PageDecorator title={'视频'}>
        <VideosPage />
      </PageDecorator>
    )
  },
  {
    path: '/search',
    element: (
      <PageDecorator title={'搜索'}>
        <SearchPage />
      </PageDecorator>
    )
  },
  {
    path: '/product/:name',
    element: (
      <PageDecorator>
        <ProductPage />
      </PageDecorator>
    ),
    children: productRoutes
  },
  {
    path: '/cart',
    children: [
      {
        path: '',
        element: (
          <PageDecorator title={'购物车'}>
            <CartPage />
          </PageDecorator>
        )
      },
      {
        path: 'successful/:label',
        element: (
          <PageDecorator title={'成功加入购物车'}>
            <CartSuccessfulPage />
          </PageDecorator>
        )
      }
    ]
  },
  {
    path: '/orders',
    element: (
      <PageDecorator requiresAuth>
        <Outlet />
      </PageDecorator>
    ),
    children: ordersRoutes
  },
  {
    path: '/user',
    element: (
      <PageDecorator requiresAuth>
        <UserLayout />
      </PageDecorator>
    ),
    children: userRoutes
  }
];

export default routes;
