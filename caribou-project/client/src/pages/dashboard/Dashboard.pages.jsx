import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useLocalStorage from '@hooks/useLocalStorage';
import { addUser } from '@redux/reducers/user/user.reducer';

// Stylesheet
import '@pages/dashboard/Dashboard.styles.scss';

// Components
import AppNavigation from '@components/app-navigation/AppNavigation.component';
import Map from '@components/map/Map.component';
import MapFormSpotHuman from '@components/map-form-spot-human/MapFormSpotHuman.component';
import AntlerExchange from '@components/antlerExchange/AntlerExchange';
// import Chatroom from '@components/chatroom/Chatroom';

const Dashboard = () => {
  const getStorageAccessToken = useLocalStorage('access-token', 'get');
  const getStorageRefreshToken = useLocalStorage('refresh-token', 'get');
  const getStorageLoggedIn = useLocalStorage('loggedIn', 'get');
  const getStorageAvatarImage = useLocalStorage('avatar-image', 'get');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      addUser({
        accessToken: getStorageAccessToken,
        refreshToken: getStorageRefreshToken,
        avatarImage: getStorageAvatarImage,
        loggedIn: getStorageLoggedIn,
      })
    );
  }, [dispatch, getStorageAccessToken, getStorageRefreshToken, getStorageAvatarImage, getStorageLoggedIn]);

  return (
    <>
      <AppNavigation />

      <div className="app-map-section">
        {/* <Chatroom /> */}
        <h1 className="app-dash-pages--map-title">Caribous Are The Best!</h1>

        <div className="app-dash-map-wrapper">
          <div className="app-dash-all-fields">
            <div className="app-dashboard-texts-field">
              <MapFormSpotHuman />
            </div>
            <div className="app-dashboard-texts-field">
              <AntlerExchange />
            </div>
            <div className="app-dashboard-texts-field">
              <MapFormSpotHuman />
            </div>
            <div className="app-dashboard-texts-field">
              <AntlerExchange />
            </div>
          </div>
          <div className="app-map">
            <div>
              <Map />
            </div>
            <div className="app-dash-all-fields app-map-custom-wrapper">
              <div className="app-dashboard-texts-field app-map-custom-fields">
                <MapFormSpotHuman />
                <p style={{ fontSize: 13 }}>Double click the map to get your current location.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
