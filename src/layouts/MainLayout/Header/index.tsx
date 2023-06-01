import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import TopBar from './TopBar';

const miniPaths = ['/cart', '/orders/checkout', '/orders/pay'];

export default function Header() {
  const location = useLocation();
  const withoutHeader = useMemo(() => {
    return miniPaths.some((item) => item === location.pathname);
  }, [location]);

  return !withoutHeader ? (
    <>
      <TopBar />
      <MainHeader />
    </>
  ) : null;
}
