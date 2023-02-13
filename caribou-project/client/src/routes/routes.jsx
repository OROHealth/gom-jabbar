// import { lazy, Suspense }
// import { Register } from '@pages/auth';
import Authentication from '@pages/authentication/authentication.component';
// import Streams from '@pages/social/streams/Streams';
import { useRoutes } from 'react-router-dom';

export const AppRouter = () => {
  const elements = useRoutes([
    // first route
    {
      path: '/',
      element: <Authentication />,
    },
  ]);

  return elements;
};
