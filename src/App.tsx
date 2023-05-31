import useAppInitial from '@/initials.ts';
import Routes from '@/routes/Routes.tsx';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  useAppInitial();

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes />
    </BrowserRouter>
  );
}
