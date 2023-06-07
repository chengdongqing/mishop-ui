import AccountLayout from '@/layouts/AccountLayout';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import PageDecorator from '@/routes/PageDecorator';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import accountRoutes from './AccountRoutes';
import authRoutes from './AuthRoutes';
import mainRoutes from './MainRoutes';

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
    path: '/account',
    element: (
      <PageDecorator requiresAuth>
        <AccountLayout />
      </PageDecorator>
    ),
    children: accountRoutes
  },
  {
    path: '*',
    element: <Navigate to={'/'} replace />
  }
];

export default function AppRoutes() {
  return useRoutes(routes);
}
