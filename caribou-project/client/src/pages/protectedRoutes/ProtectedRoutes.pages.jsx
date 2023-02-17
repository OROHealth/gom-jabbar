import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '@hooks/useLocalStorage';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const loggedIn = useLocalStorage('loggedIn', 'get');
  const reduxLoggedIn = useSelector((state) => state?.user?.loggedIn);

  useEffect(() => {
    console.log('Protected Route HIT - Dashboard - ProtectedRoutes.pages.jsx');

    !reduxLoggedIn && !loggedIn && navigate('/');
  }, [loggedIn, navigate, reduxLoggedIn]);

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default ProtectedRoutes;
