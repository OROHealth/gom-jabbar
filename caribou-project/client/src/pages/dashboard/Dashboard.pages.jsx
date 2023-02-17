import React from 'react';

// Stylesheet
import '@pages/dashboard/Dashboard.styles.scss';

// Components
import AppNavigation from '@components/app-navigation/AppNavigation.component';
import Map from '@components/map/Map.component';
import MapFormSpotHuman from '@components/map-form-spot-human/MapFormSpotHuman.component';
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

      <div className="app-map-section">
        <div className="app-dash-map-wrapper">
          <div className="app-dashboard-texts-field">
            <h1 className="app-dash-pages--map-title">Caribous Are The Best!</h1>
            <MapFormSpotHuman />
          </div>
          <div className="app-map">
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
