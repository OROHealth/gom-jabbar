// import React, { useEffect } from 'react';

// Components
import AppNavigation from '@components/app-navigation/AppNavigation.component';
import Map from '@components/map/Map.component';
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
      {/* <div style={{ textAlign: 'center', fontSize: 36, fontWeight: 900, color: '#de006f' }}>
        Welcome To Our Secret Dashboard
      </div> */}
      <div>
        {/* input field */}
        <div className="app-map">
          <Map />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
