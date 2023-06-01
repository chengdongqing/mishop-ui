import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ordersRoutes from './orders';
import productRoutes from './product';

const HomePage = lazy(() => import('@/pages/Home'));
const VideosPage = lazy(() => import('@/pages/Videos'));
const SearchPage = lazy(() => import('@/pages/Search'));
const ProductPage = lazy(() => import('@/pages/Product'));
const CartPage = lazy(() => import('@/pages/Cart'));
const CartSuccessfulPage = lazy(() => import('@/pages/Cart/Successful'));
const CheckoutPage = lazy(() => import('../../pages/Checkout'));

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
    path: '/product/:label',
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
    path: '/checkout',
    element: (
      <PageDecorator title={'填写订单信息'}>
        <CheckoutPage />
      </PageDecorator>
    )
  },
  {
    path: '/orders',
    children: ordersRoutes
  }
];

export default routes;
