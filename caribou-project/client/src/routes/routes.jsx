// import { lazy, Suspense }
import Authentication from '@pages/authentication/authentication.component';
import { useRoutes } from 'react-router-dom';
import Dashboard from '@pages/dashboard/Dashboard.pages';
import ProtectedRoutes from '@pages/protectedRoutes/ProtectedRoutes.pages';
import ChatMeetingRoom from '@components/chatMeetingRoom/ChatMeetingRoom';

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
        {
          path: 'secret-meeting-room',
          element: <ChatMeetingRoom />,
        },
        {
          path: ':chatroom',
          element: <ChatMeetingRoom />,
        },
      ],
    },
  ]);

  return elements;
};
