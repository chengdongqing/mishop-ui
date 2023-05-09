import MainLayout from '@/layouts/MainLayout';
import routes from '@/routes';
import RouteDecorator from '@/routes/RouteDecorator.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<RouteDecorator route={route} />}
            />
          ))}
        </Route>
        <Route path={'*'} element={<Navigate to={'/'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
