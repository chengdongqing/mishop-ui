import Loading from '@/components/Loading';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { PropsWithChildren, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PageDecoratorProps extends PropsWithChildren {
  // 页面标题
  title?: string;
  // 是否需要登录认证
  requiresAuth?: boolean;
}

export default function PageDecorator({
  children,
  title,
  requiresAuth
}: PageDecoratorProps) {
  const navigate = useNavigate();
  const hasLogin = useHasLogin();

  useEffect(() => {
    if (requiresAuth && !hasLogin) {
      navigate('/login');
    } else if (title) {
      document.title = [title, '小米商城'].join(' - ');
    }
  }, [hasLogin, navigate, requiresAuth, title]);

  return (
    <Suspense fallback={<Loading style={{ height: '50vh' }} />}>
      {children}
    </Suspense>
  );
}
