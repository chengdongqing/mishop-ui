import { IRoute } from './index';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
        document.title = meta.title;
      }
    }
  }, [route]);

  return <>{route.element}</>;
}
