import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MainHeader from './MainHeader';
import MiniHeader from './MiniHeader';
import TopBar from './TopBar';

export default function Header() {
  const location = useLocation();
  const isCartPage = useMemo(() => {
    return location.pathname.endsWith('cart');
  }, [location]);

  return !isCartPage ? (
    <>
      <TopBar />
      <MainHeader />
    </>
  ) : (
    <MiniHeader />
  );
}
