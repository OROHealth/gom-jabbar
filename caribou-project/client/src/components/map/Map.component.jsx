import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, useMapEvents, CircleMarker, Tooltip } from 'react-leaflet';
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
    x: 0,
    y: 0,
  },
];

const Map = (props) => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [allMapLocations, setAllMapLocations] = useState(AllMapLocationInitial);

  useEffect(() => {
    const getLocations = () => {
      const locationSpotted = mapService.getAllLocations().then((res) => {
        if (res.data?.locations) {
          setAllMapLocations(res.data.locations);
        }
      });
      return locationSpotted;
    };
    return getLocations;
  }, [setAllMapLocations]);

  // const position = [45.49898, -73.647124];

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
        <Popup>You are around here</Popup>
      </CircleMarker>
    );
  }

  const limeOptions = { color: 'lime' };
  // const purpleOptions = { color: 'purple' };
  // const fillBlueOptions = { fillColor: 'blue' };
  // const blackOptions = { color: 'black' };
  // const redOptions = { color: 'red' };
  // typeof Object.entries(marker)

  // <CircleMarker center={circleMarkerPosition} pathOptions={redOptions} radius={30}>
  // <Popup>Popup in CircleMarker</Popup>
  // </CircleMarker>

  return (
    <div>
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
            console.log('Find Items: ', marker);
            // Gets the ISO-8601 date and converts it to local Date and transforms it to a string and save.
            let exDate1 = new Date(marker.expiresAt);
            exDate1 = exDate1.toLocaleString('en-US').toString();

            return (
              <div key={`${marker.id}${marker.x}`}>
                <CircleMarker center={[marker.y, marker.x]} pathOptions={limeOptions} radius={marker.trashingLevel}>
                  <Popup>
                    <div>
                      <div>Trashing Level: {marker.trashingLevel}</div>
                      <div>Excitement Level: {marker.excitementLevel}</div>
                      <div>Expires at: {exDate1}</div>
                      <p>Humans Are Here! So Stay Away.</p>
                    </div>
                    <Tooltip direction="top" offset={[-10, -10]} opacity={1}>
                      Hello
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
