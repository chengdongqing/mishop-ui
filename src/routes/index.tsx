import Loading from '@/components/Loading';
import MainLayout from '@/layouts/MainLayout';
import { ComponentType, lazy, Suspense, useEffect } from 'react';
import { Navigate, RouteObject, useNavigate, useRoutes } from 'react-router-dom';

const hasLogin = false;

function PageDecorator({
  file,
  title,
  requireAuth
}: {
  file: Promise<{ default: ComponentType }>;
  title?: string;
  requireAuth?: boolean;
}) {
  const Page = lazy(() => file);
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !hasLogin) {
      navigate('/login');
    } else if (title) {
      document.title = [title, '小米商城'].join(' - ');
    }
  }, [navigate, requireAuth, title]);

  return (
    <Suspense fallback={<Loading delay={200} />}>
      <Page />
    </Suspense>
  );
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <PageDecorator file={import('../pages/Home')} title={'首页'} />
      },
      {
        path: '/videos',
        element: (
          <PageDecorator file={import('../pages/Videos')} title={'视频'} />
        )
      },
      {
        path: '/search',
        element: (
          <PageDecorator file={import('../pages/Search')} title={'搜索'} />
        )
      },
      {
        path: '/cart',
        element: (
          <PageDecorator file={import('../pages/Cart')} title={'购物车'} />
        )
      },
      {
        path: '/cart/added-successfully',
        element: (
          <PageDecorator
            file={import('../pages/Cart/AddedSuccessfully')}
            title={'成功加入购物车'}
          />
        )
      },
      {
        path: '/product/:label',
        element: <PageDecorator file={import('../pages/Product')} />,
        children: [
          {
            path: '',
            element: <PageDecorator file={import('../pages/Product/Sketch')} />
          },
          {
            path: 'specs',
            element: <PageDecorator file={import('../pages/Product/Specs')} />
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
