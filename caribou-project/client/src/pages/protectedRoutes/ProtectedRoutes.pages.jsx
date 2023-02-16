import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state?.user?.loggedIn);
  console.log(loggedIn);

  useEffect(() => {
    console.log('useEffect worked');
    !loggedIn && navigate('/');
  }, [loggedIn, navigate]);

  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default ProtectedRoutes;
