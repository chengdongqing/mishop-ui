import Loading from '@/components/Loading';
import { ComponentType, lazy, Suspense } from 'react';
import { RouteProps } from 'react-router-dom';

export type IRoute = RouteProps & {
  meta?: {
    title?: string;
    requireAuth?: boolean;
  };
};

// eslint-disable-next-line react-refresh/only-export-components
function LazyLoadPage({ file }: { file: Promise<{ default: ComponentType }> }) {
  const Page = lazy(() => file);

  return (
    <Suspense fallback={<Loading delay={500} />}>
      <Page />
    </Suspense>
  );
}

const routes: IRoute[] = [
  {
    path: '/',
    element: <LazyLoadPage file={import('../pages/Home')} />,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/videos',
    element: <LazyLoadPage file={import('../pages/Videos')} />,
    meta: {
      title: '小米视频'
    }
  },
  {
    path: '/search',
    element: <LazyLoadPage file={import('../pages/Search')} />,
    meta: {
      title: '搜索'
    }
  }
];

export default routes;
