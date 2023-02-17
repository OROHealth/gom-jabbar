import React from 'react';

// Stylesheet
import '@pages/dashboard/Dashboard.styles.scss';

// Components
import AppNavigation from '@components/app-navigation/AppNavigation.component';
import Map from '@components/map/Map.component';
import MapFormSpotHuman from '@components/map-form-spot-human/MapFormSpotHuman.component';

const Dashboard = () => {
  return (
    <>
      <AppNavigation />
      <div className="app-map-section">
        <h1 className="app-dash-pages--map-title">Caribous Are The Best!</h1>

        <div className="app-dash-map-wrapper">
          <div className="app-dash-all-fields">
            <div className="app-dashboard-texts-field">
              <MapFormSpotHuman />
            </div>
            <div className="app-dashboard-texts-field">
              <MapFormSpotHuman />
            </div>
            <div className="app-dashboard-texts-field">
              <MapFormSpotHuman />
            </div>
            <div className="app-dashboard-texts-field">
              <MapFormSpotHuman />
            </div>
          </div>
          <div className="app-map">
            <p>Double click the map to get your current location.</p>
            <Map />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
