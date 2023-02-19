import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, useMapEvents, CircleMarker, Tooltip } from 'react-leaflet';
import { mapBoxApiKey, googleApiKey } from '@services/utils/config';
import { useDispatch } from 'react-redux';
import { addLocationToMap } from '@redux/reducers/map/map.reducer';
import useLocalStorage from '@hooks/useLocalStorage';

// Api
// import axios from 'axios';
import { mapService } from '@services/api/map/map.service';

// StyleSheets
import '@components/map/Map.styles.scss';
import '../../../node_modules/leaflet-geosearch/dist/geosearch.css';

// Map Geolocation Search Feature & Controller
import { GoogleProvider, GeoSearchControl } from 'leaflet-geosearch';
import { authService } from '@services/api/auth/auth.service';
import { addUser } from '@redux/reducers/user/user.reducer';
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
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [allMapLocations, setAllMapLocations] = useState(AllMapLocationInitial);
  const getStorageRefreshToken = useLocalStorage('refresh-token', 'get');
  const getStorageLoggedIn = useLocalStorage('loggedIn', 'get');
  const getStorageAvatarImage = useLocalStorage('avatar-image', 'get');
  const [setStorageRefreshToken] = useLocalStorage('refresh-token', 'set');
  const [setStorageAccessToken] = useLocalStorage('access-token', 'set');
  const [refreshed, setRefreshed] = useState(true);

  console.log(refreshed);

  useEffect(() => {
    const getLocations = async () => {
      if (refreshed) {
        const stringifyRefreshToken = getStorageRefreshToken?.data?.refreshToken;
        // Making sure the access and refresh token is always up to date.
        const newRefreshToken = await authService.verifyRefreshToken({ refreshToken: stringifyRefreshToken });
        const { accessToken, refreshToken } = newRefreshToken.data;
        setStorageRefreshToken(newRefreshToken);
        setStorageAccessToken(accessToken);
        dispatch(
          addUser({
            refreshToken,
            accessToken,
            avatarImage: getStorageAvatarImage,
            loggedIn: getStorageLoggedIn,
          })
        );
        setRefreshed(false);
      }

      try {
        const locationSpotted = await mapService.getAllLocations().then((res) => {
          console.log('res', res);
          if (res.data?.locations) {
            setAllMapLocations(res.data.locations);
            return res.data?.locations;
          }
        });

        console.log('locationSpotted', locationSpotted);
      } catch (error) {
        console.log(error);
      }
    };
    return getLocations;
  }, []);

  function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click(e) {
        map.locate();
      },

      locationfound(e) {
        // console.log('Found location Event: I Found You');
        setPosition(e.latlng);
        map.flyTo(e.latlng);
      },
    });

    map.addControl(searchControl);
    map.on('geosearch/showlocation', (event) => {
      const { location } = event;
      // setNewLocationToMap({ ...newLocationToMap, y: location.y, x: location.x, label: location.label });
      // console.log('Map event', location, 'Map.component');
      dispatch(
        addLocationToMap({
          y: location.y,
          x: location.x,
          label: location.label,
        })
      );
    });

    return position === null ? null : (
      <CircleMarker center={position} pathOptions={{ color: 'blue' }} radius={50}>
        <Popup>You are around here.</Popup>
        <Tooltip direction="top" offset={[-10, -10]} opacity={1}>
          <p>You are around here somewhere.</p>
        </Tooltip>
      </CircleMarker>
    );
  }

  // const limeOptions = { color: 'lime' };
  // const purpleOptions = { color: 'purple' };
  // const fillBlueOptions = { fillColor: 'blue' };
  // const blackOptions = { color: 'black' };
  const redOptions = { color: 'red' };
  // typeof Object.entries(marker)

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
              <div key={`${marker.id}${marker.x}`}>
                <CircleMarker center={[marker.y, marker.x]} pathOptions={redOptions} radius={marker.trashingLevel}>
                  <Popup>
                    <div>
                      <div>Trashing Level: {marker.trashingLevel}</div>
                      <div>Excitement Level: {marker.excitementLevel}</div>
                      <div>Expires at: {exDate1}</div>
                    </div>
                    <Tooltip direction="top" offset={[-10, -10]} opacity={1}>
                      <p>Humans Are Here! So Stay Away.</p>
                    </Tooltip>
                  </Popup>
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
