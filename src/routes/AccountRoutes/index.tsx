import PageDecorator from '@/routes/PageDecorator';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const AccountPage = lazy(() => import('@/pages/Account/Account'));
const ProfilePage = lazy(() => import('@/pages/Account/Profile'));

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <PageDecorator title={'登录与安全'}>
        <AccountPage />
      </PageDecorator>
    )
  },
  {
    path: 'profile',
    element: (
      <PageDecorator title={'个人信息'}>
        <ProfilePage />
      </PageDecorator>
    )
  }
];

export default routes;
