import AppRoutes from '@/routes';
import useAppInitial from '@/useAppInitial.ts';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  useAppInitial();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
