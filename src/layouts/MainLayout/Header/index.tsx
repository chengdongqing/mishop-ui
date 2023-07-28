import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import TopBar from './TopBar';

const miniHeaderPaths = [
  '/cart',
  '/orders/checkout',
  {
    predicate(pathname: string) {
      return (
        pathname.startsWith('/orders/pay') && !pathname.endsWith('successfully')
      );
    }
  }
];

export default function Header() {
  const { pathname } = useLocation();
  const withoutHeader = useMemo(() => {
    return miniHeaderPaths.some((item) => {
      return typeof item === 'object'
        ? item.predicate(pathname)
        : pathname === item;
    });
  }, [pathname]);

  return !withoutHeader ? (
    <>
      <TopBar />
      <MainHeader />
    </>
  ) : null;
}
