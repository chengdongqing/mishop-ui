import { useCartInitial } from '@/pages/Cart/MainCart/helpers.ts';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function MainLayout() {
  useCartInitial();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
