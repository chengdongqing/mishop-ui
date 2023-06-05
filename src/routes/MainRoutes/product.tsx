import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ProductSketchPage = lazy(() => import('@/pages/Product/Sketch'));
const ProductSpecsPage = lazy(() => import('@/pages/Product/Specs'));
const ProductCommentsPage = lazy(() => import('@/pages/Product/Comments'));
const ProductBuyingPage = lazy(() => import('@/pages/Product/Buy'));

const routes: RouteObject[] = [
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
  },
  {
    path: 'buy',
    element: (
      <PageDecorator title={'立即购买'}>
        <ProductBuyingPage />
      </PageDecorator>
    )
  }
];

export default routes;
