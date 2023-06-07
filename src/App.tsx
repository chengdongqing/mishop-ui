import useAppInitial from '@/initials.ts';
import AppRoutes from '@/routes';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  useAppInitial();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
