import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ProductSketchPage = lazy(() => import('@/pages/Product/Sketch'));
const ProductSpecsPage = lazy(() => import('@/pages/Product/Specs'));
const ProductReviewsPage = lazy(() => import('@/pages/Product/Reviews'));
const BuyProductPage = lazy(() => import('@/pages/Product/Buy'));

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
    path: 'reviews',
    element: (
      <PageDecorator title={'商品评论'}>
        <ProductReviewsPage />
      </PageDecorator>
    )
  },
  {
    path: 'buy',
    element: (
      <PageDecorator title={'立即购买'}>
        <BuyProductPage />
      </PageDecorator>
    )
  }
];

export default routes;
