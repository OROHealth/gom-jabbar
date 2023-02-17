// import React, { useEffect } from 'react';
import AppNavigation from '@components/app-navigation/AppNavigation.component';
// import useLocalStorage from '@hooks/useLocalStorage';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const Dashboard = () => {
  // const navigate = useNavigate();
  // const loggedIn = useLocalStorage('loggedIn', 'get');
  // const reduxLoggedIn = useSelector((state) => state?.user?.loggedIn);
  // console.log(loggedIn);

  // useEffect(() => {
  //   console.log('useEffect worked');
  //   !reduxLoggedIn && !loggedIn && navigate('/');
  // }, [loggedIn, navigate, reduxLoggedIn]);

  return (
    <>
      <AppNavigation />
      <div>Welcome to the dashboard</div>
    </>
  );
};

export default Dashboard;
