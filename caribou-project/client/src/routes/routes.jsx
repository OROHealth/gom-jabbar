// import { lazy, Suspense }
import Authentication from '@pages/authentication/authentication.component';
import { useRoutes } from 'react-router-dom';
import Dashboard from '@pages/dashboard/Dashboard.pages';
import ProtectedRoutes from '@pages/protectedRoutes/ProtectedRoutes.pages';

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Authentication />,
    },
    {
      path: '/app/',
      element: <ProtectedRoutes />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return elements;
};
