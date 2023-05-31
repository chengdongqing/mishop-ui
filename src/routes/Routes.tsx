import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import authRoutes from './AuthRoutes.tsx';
import mainRoutes from './MainRoutes.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: mainRoutes
  },
  {
    path: '/auth',
    element: <Navigate to={'/auth/login'} replace />
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRoutes
  },
  {
    path: '*',
    element: <Navigate to={'/'} replace />
  }
];

export default function Routes() {
  return useRoutes(routes);
}
