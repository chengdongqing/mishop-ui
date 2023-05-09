import Loading from '@/components/Loading';
import { lazy, Suspense } from 'react';
import { RouteProps } from 'react-router-dom';

export type IRoute = RouteProps & {
  meta?: {
    title?: string;
    requireAuth?: boolean;
  };
};

// eslint-disable-next-line react-refresh/only-export-components
function LazyLoadPage({ path }: { path: string }) {
  const Page = lazy(() => import(`/src/pages/${path}`));

  return (
    <Suspense fallback={<Loading delay={500} />}>
      <Page />
    </Suspense>
  );
}

const routes: IRoute[] = [
  {
    path: '/',
    element: <LazyLoadPage path={'Home'} />,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/videos',
    element: <LazyLoadPage path={'Videos'} />,
    meta: {
      title: '小米视频'
    }
  },
  {
    path: '/search',
    element: <LazyLoadPage path={'Search'} />,
    meta: {
      title: '搜索'
    }
  }
];

export default routes;
