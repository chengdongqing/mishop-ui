import HomePage from '@/pages/Home';
import SearchPage from '@/pages/Search';
import VideosPage from '@/pages/Videos';
import { RouteProps } from 'react-router-dom';

export type IRoute = RouteProps & {
  meta?: {
    title?: string;
    requireAuth?: boolean;
  };
};

const routes: IRoute[] = [
  {
    path: '/',
    element: <HomePage />,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/videos',
    element: <VideosPage />,
    meta: {
      title: '小米视频'
    }
  },
  {
    path: '/search',
    element: <SearchPage />,
    meta: {
      title: '搜索'
    }
  }
];

export default routes;
