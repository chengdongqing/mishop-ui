import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import routes from '@/routes';
import RouteDecorator from '@/routes/RouteDecorator.tsx';
import MainLayout from '@/layouts/MainLayout';

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

        <Route path={'*'} element={<Navigate to={'/'} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
