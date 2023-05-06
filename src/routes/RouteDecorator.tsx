import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRoute } from './index';

const hasLogin = false;

export default function RouteDecorator({ route }: { route: IRoute }) {
  const navigate = useNavigate();

  useEffect(() => {
    const { meta } = route;
    if (meta) {
      if (meta.requireAuth && !hasLogin) {
        navigate('/login', {
          state: {
            redirect: route.path
          }
        });
      } else if (meta.title) {
        document.title = [meta.title, '小米商城'].join(' - ');
      }
    }
  }, [navigate, route]);

  return <>{route.element}</>;
}
