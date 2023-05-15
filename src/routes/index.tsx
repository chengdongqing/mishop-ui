import MainLayout from '@/layouts/MainLayout';
import { lazy } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import PageDecorator from './PageDecorator.tsx';

const HomePage = lazy(() => import('@/pages/Home'));
const VideosPage = lazy(() => import('@/pages/Videos'));
const SearchPage = lazy(() => import('@/pages/Search'));
const CartPage = lazy(() => import('@/pages/Cart'));
const CartSuccessfullyPage = lazy(() => import('@/pages/Cart/Successfully'));
const ProductPage = lazy(() => import('@/pages/Product'));
const ProductSketchPage = lazy(() => import('@/pages/Product/Sketch'));
const ProductSpecsPage = lazy(() => import('@/pages/Product/Specs'));
const ProductCommentsPage = lazy(() => import('@/pages/Product/Comments'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
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
        path: '/cart',
        element: (
          <PageDecorator title={'购物车'}>
            <CartPage />
          </PageDecorator>
        )
      },
      {
        path: '/cart/added-successfully',
        element: (
          <PageDecorator title={'成功加入购物车'}>
            <CartSuccessfullyPage />
          </PageDecorator>
        )
      },
      {
        path: '/product/:label',
        element: (
          <PageDecorator title={'商品详情'}>
            <ProductPage />
          </PageDecorator>
        ),
        children: [
          {
            path: '',
            element: (
              <PageDecorator title={'商品概述'}>
                <ProductSketchPage />
              </PageDecorator>
            )
          },
          {
            path: 'specs',
            element: (
              <PageDecorator title={'商品参数'}>
                <ProductSpecsPage />
              </PageDecorator>
            )
          },
          {
            path: 'comments',
            element: (
              <PageDecorator title={'商品评论'}>
                <ProductCommentsPage />
              </PageDecorator>
            )
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={'/'} replace />
  }
];

export default function Routes() {
  return useRoutes(routes);
}
