import { useCartInitial } from '@/pages/Cart/MainCart/helpers.ts';
import Routes from '@/routes';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  useCartInitial();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes />
    </BrowserRouter>
  );
}
