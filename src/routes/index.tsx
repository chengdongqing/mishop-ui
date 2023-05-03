import HomePage from '@/pages/Home';
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
  }
];

export default routes;
