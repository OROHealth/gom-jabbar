// import { lazy, Suspense }
import { Register } from '@pages/auth';
// import Streams from '@pages/social/streams/Streams';
import { useRoutes } from 'react-router-dom';

export const AppRouter = () => {
  const elements = useRoutes([
    // first route
    {
      path: '/',
      element: <Register />,
    },
    // {
    //   path: '/app/streams',
    //   element: <Streams />,
    // },
  ]);

  return elements;
};
