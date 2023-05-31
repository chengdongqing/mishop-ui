import LoginByPassword from '@/pages/Auth/Login/Password.tsx';
import LoginByVerificationCode from '@/pages/Auth/Login/VerificationCode.tsx';
import PageDecorator from '@/routes/PageDecorator.tsx';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('@/pages/Auth/Login'));
const RegisterPage = lazy(() => import('@/pages/Auth/Register'));
const PasswordResetPage = lazy(() => import('@/pages/Auth/PasswordReset'));

const routes: RouteObject[] = [
  {
    path: 'login',
    element: <Navigate to={'password'} replace />
  },
  {
    path: 'login',
    element: (
      <PageDecorator title={'登录'}>
        <LoginPage />
      </PageDecorator>
    ),
    children: [
      {
        path: 'password',
        element: (
          <PageDecorator>
            <LoginByPassword />
          </PageDecorator>
        )
      },
      {
        path: 'verification-code',
        element: (
          <PageDecorator>
            <LoginByVerificationCode />
          </PageDecorator>
        )
      }
    ]
  },
  {
    path: 'register',
    element: (
      <PageDecorator title={'注册'}>
        <RegisterPage />
      </PageDecorator>
    )
  },
  {
    path: 'password-reset',
    element: (
      <PageDecorator title={'重置密码'}>
        <PasswordResetPage />
      </PageDecorator>
    )
  }
];

export default routes;
