import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, CircleMarker, Tooltip } from 'react-leaflet';
import { mapBoxApiKey, googleApiKey } from '@services/utils/config';
import { useDispatch } from 'react-redux';
import { addLocationToMap } from '@redux/reducers/map/map.reducer';

// Api
import { mapService } from '@services/api/map/map.service';

// StyleSheets
import '@components/map/Map.styles.scss';
import '../../../node_modules/leaflet-geosearch/dist/geosearch.css';

// Map Geolocation Search Feature & Controller
import { GoogleProvider, GeoSearchControl } from 'leaflet-geosearch';
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
  },
];

// console.log('searchControl', searchControl, 'Map component');

const Map = (props) => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const [newLocationToMap, setNewLocationToMap] = useState(HumanPresenceInitial);
  const [allMapLocations, setAllMapLocations] = useState(AllMapLocationInitial);

  useEffect(() => {
    const getLocations = async () => {
      const locationMarks = await mapService.getAllLocations().then((res) => {
        console.log(res?.data?.locations, 'useEffect Map component');
        if (res.data?.locations) {
          return res?.data?.locations;
        }
      });
      return locationMarks;
    };
    setAllMapLocations([getLocations()]);
  }, []);

  const position = [45.49898, -73.647124];
  const markerPosition = [45.5023524, -73.78907];
  const circlePosition = [45.524403, -73.7436546];
  const circleMarkerPosition = [45.475649, -73.664999];

  function LocationMarker() {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click(e) {
        map.locate();
      },

      locationfound(e) {
        console.log('Found location Event: I Found You');
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
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
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  const fillBlueOptions = { fillColor: 'blue' };
  const redOptions = { color: 'red' };
  console.log(allMapLocations);

  return (
    <div>
      <MapContainer className="map-container" position={position} center={position} zoom={11} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" accessToken={`${mapBoxApiKey}`} />
        <Circle center={circlePosition} pathOptions={fillBlueOptions} radius={1000} />
        <CircleMarker center={circleMarkerPosition} pathOptions={redOptions} radius={30}>
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker>
        <Marker position={markerPosition}>
          <Tooltip direction="top" offset={[-10, -10]} opacity={1}>
            Hello
          </Tooltip>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {allMapLocations &&
          allMapLocations.map((marker) => {
            return (
              <>
                <div key={marker.id}>
                  <Marker position={markerPosition}>
                    <Tooltip direction="top" offset={[-10, -10]} opacity={1}>
                      You are here
                    </Tooltip>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </div>
              </>
            );
          })}

        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
