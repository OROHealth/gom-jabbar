import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, useMapEvents, CircleMarker, Tooltip } from 'react-leaflet';
import { mapBoxApiKey, googleApiKey } from '@services/utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { addLocationToMap } from '@redux/reducers/map/map.reducer';
import useLocalStorage from '@hooks/useLocalStorage';

// Api
// import axios from 'axios';
import { mapService } from '@services/api/map/map.service';

// Socket IO
import socket from '@services/websocket/webSocketIO';

// StyleSheets
import '@components/map/Map.styles.scss';
import '../../../node_modules/leaflet-geosearch/dist/geosearch.css';

// Map Geolocation Search Feature & Controller
import { GoogleProvider, GeoSearchControl } from 'leaflet-geosearch';
import { authService } from '@services/api/auth/auth.service';
import { addUser } from '@redux/reducers/user/user.reducer';
import { addLocationsFound } from '@redux/reducers/locationsFound/locationsFound.reducer';
const provider = new GoogleProvider({
  apiKey: googleApiKey,
});

const searchControl = new GeoSearchControl({
  provider,
  style: 'bar',
  resultFormat: ({ result }) => result.label,
  showMarker: true,
  keepResult: true,
});

const AllMapLocationInitial = [
  {
    id: '',
    labelName: '',
    trashingLevel: '',
    excitementLevel: '',
    expiresAt: '',
    createdAt: '',
    updatedAt: '',
    x: 0,
    y: 0,
  },
];

const Map = (props) => {
  const dispatch = useDispatch();
  const [allMapLocations, setAllMapLocations] = useState(AllMapLocationInitial);
  const getStorageRefreshToken = useLocalStorage('refresh-token', 'get');
  const getStorageLoggedIn = useLocalStorage('loggedIn', 'get');
  const getStorageAvatarImage = useLocalStorage('avatar-image', 'get');
  const getStorageEmail = useLocalStorage('app-email', 'get');
  const [setStorageRefreshToken] = useLocalStorage('refresh-token', 'set');
  const [setStorageAccessToken] = useLocalStorage('access-token', 'set');
  const [refreshed, setRefreshed] = useState(true);
  const stateRefreshToken = useSelector((state) => state.user.refreshToken);
  const [humanAdded, setHumanAdded] = useState(false);

  useEffect(() => {
    let isCancelled = true;

    const getLocations = async () => {
      if (refreshed) {
        const stringifyRefreshToken = getStorageRefreshToken;
        // Making sure the access and refresh token is always up to date.
        try {
          if (isCancelled) {
            // The refresh token will be found in either the local storage or in the redux state
            const newRefreshToken = await authService.verifyRefreshToken({
              refreshToken: stringifyRefreshToken?.data?.refreshToken || stringifyRefreshToken || stateRefreshToken,
            });
            // console.log('Line 82: refreshToken Received from backend', newRefreshToken, 'Map Component');

            const { accessToken, refreshToken } = newRefreshToken.data;
            setStorageRefreshToken(newRefreshToken);
            setStorageAccessToken(accessToken);
            dispatch(
              addUser({
                refreshToken,
                accessToken,
                avatarImage: getStorageAvatarImage,
                loggedIn: getStorageLoggedIn,
                email: getStorageEmail,
              })
            );
            setRefreshed(false);
          }
        } catch (error) {
          console.log('Line 103: Refresh token fetch Error', error, 'Map Component');
        }
      }

      try {
        // Get initial Locations on first Render
        await mapService.getAllLocations().then((res) => {
          // console.log('Line 105: Result of Fetching locations: ', res, 'Map Component');
          if (isCancelled) {
            if (res?.data?.locations) {
              setAllMapLocations(res.data.locations);
              dispatch(addLocationsFound([res.data.locations]));
              return res?.data?.locations;
            }
          }
        });
      } catch (error) {
        console.log(`Line 115: Error:`, error, 'Map Component');
      }
    };
    getLocations();
    return () => {
      isCancelled = false;
    };
    // eslint-disable-next-line
  }, [dispatch]);

  // User Added Fetch new users - Run a fetch when locations are added
  if (humanAdded) {
    const getLocations = async () => {
      try {
        await mapService.getAllLocations().then((res) => {
          // console.log('Line 105: Result of Fetching locations: ', res, 'Map Component');

          if (res?.data?.locations) {
            setAllMapLocations(res.data.locations);
            dispatch(addLocationsFound(res.data.locations));
            return res?.data?.locations;
          }
        });
      } catch (error) {
        console.log(`Line 115: Error:`, error, 'Map Component');
      }
      setHumanAdded(false);
    };
    getLocations();
  }

  // Handle Receive New Map Location Added Signal and Starts fetching the new Data
  useEffect(() => {
    let isCancelled = true;
    if (isCancelled) {
      socket.on('location_added_broadcast', (data) => {
        setHumanAdded(true);
      });
    }
    return () => {
      isCancelled = false;
    };
  }, []);

  // Map Event Listeners, Markers & Search
  function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click(e) {
        map.locate();
      },

      // Gets the Location of the current user
      locationfound(event) {
        setPosition(event.latlng);
        map.flyTo(event.latlng);
      },
    });

    // Search feature with Google Maps GeoLocation API
    map.addControl(searchControl);
    map.on('geosearch/showlocation', (event) => {
      const { location } = event;
      dispatch(
        addLocationToMap({
          y: location.y,
          x: location.x,
          label: location.label,
        })
      );
    });

    return position === null ? null : (
      <CircleMarker center={position} pathOptions={{ color: 'blue' }} radius={30}>
        <Popup>You are around here.</Popup>
        <Tooltip direction="top" offset={[-10, -10]} opacity={1}>
          <p>You are around here somewhere.</p>
        </Tooltip>
      </CircleMarker>
    );
  }

  const redOptions = { color: 'red' };
  return (
    <div className="map-wrapper">
      <MapContainer
        className="map-container"
        position={[45.49898, -73.647124]}
        center={[45.53498, -73.648124]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" accessToken={`${mapBoxApiKey}`} />
        {allMapLocations &&
          allMapLocations.map((marker, id) => {
            // Gets the ISO-8601 date and converts it to local Date and transforms it to a string and save.
            let exDate1 = new Date(marker.expiresAt);

            exDate1 = exDate1.toLocaleString('en-US').toString();

            return (
              <div key={`${marker.id}`}>
                <CircleMarker center={[marker.y, marker.x]} pathOptions={redOptions} radius={marker.trashingLevel * 2}>
                  <Tooltip>
                    <div>
                      <div>Trashing Level: {marker.trashingLevel}</div>
                      <div>Excitement Level: {marker.excitementLevel}</div>
                      <div>Expires at: {exDate1}</div>
                    </div>
                    <Popup direction="top" offset={[-10, -10]} opacity={1}>
                      <p>Humans Are Here! So Stay Away.</p>
                    </Popup>
                  </Tooltip>
                </CircleMarker>
              </div>
            );
          })}

        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
