import Loading from '@/components/Loading';
import { useHasLogin } from '@/store/slices/userSlice.ts';
import { PropsWithChildren, Suspense, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PageDecoratorProps {
  // 页面标题
  title?: string;
  // 是否需要登录认证
  requiresAuth?: boolean;
}

export default function PageDecorator({
  children,
  title,
  requiresAuth
}: PropsWithChildren<PageDecoratorProps>) {
  const hasLogin = useHasLogin();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (requiresAuth && !hasLogin) {
        navigate('/auth/login', {
          state: {
            pathname
          }
        });
      } else if (title) {
        document.title = [title, '小米商城'].join(' - ');
      }
    }, 100);
  }, [hasLogin, navigate, pathname, requiresAuth, title]);

  return (
    <Suspense fallback={<Loading style={{ height: '50vh' }} />}>
      {children}
    </Suspense>
  );
}
