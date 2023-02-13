// import { lazy, Suspense }
// import { Register } from '@pages/auth';
import Authentication from '@pages/authentication/authentication.component';
// import Streams from '@pages/social/streams/Streams';
import { useRoutes } from 'react-router-dom';
import Dashboard from '@pages/dashboard/Dashboard.pages';

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <Authentication />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
  ]);

  return elements;
};
