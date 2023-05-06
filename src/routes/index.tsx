import HomePage from '@/pages/Home';
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
  }
];

export default routes;
