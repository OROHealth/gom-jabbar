import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, CircleMarker, Tooltip } from 'react-leaflet';
import { mapBoxApiKey, googleApiKey } from '@services/utils/config';

// StyleSheets
import '@components/map/Map.styles.scss';
import '../../../node_modules/leaflet-geosearch/dist/geosearch.css';

// Components
// import FormInput from '@components/form-input/formInput.component';
// import Button from '@components/button/Button';
// import ReactSpinner from '@components/react-spinner/react-spinner.component';

// Map Geolocation Search Feature & Controller
import { GoogleProvider, GeoSearchControl } from 'leaflet-geosearch';
export const provider = new GoogleProvider({
  apiKey: googleApiKey,
});
const searchControl = new GeoSearchControl({
  provider,
  style: 'bar',
});
// console.log('searchControl', (searchControl.searchElement.input.value = searchQuery), 'Map component');

const shownMarkersInitial = [
  {
    id: '',
    x: '',
    y: '',
  },
];

const Map = (props) => {
  // const [loading, setLoading] = useState(false);
  const [markersShown, setMarkersShown] = useState(shownMarkersInitial);
  const position = [45.49898, -73.647124];
  const markerPosition = [45.524403, -73.7436546];
  const circlePosition = [45.524403, -73.7436546];
  const circleMarkerPosition = [45.475649, -73.664999];

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      // keyup(e) {
      //   console.log(e.originalEvent.target.value);
      // },

      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    map.addControl(searchControl);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  const fillBlueOptions = { fillColor: 'blue' };
  const redOptions = { color: 'red' };

  useEffect(() => {
    setMarkersShown([{}]);
  }, [setMarkersShown]);

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
        {markersShown &
          markersShown.map((marker) => {
            return (
              <Marker key={marker.id} position={markerPosition}>
                <Tooltip direction="top" offset={[-10, -10]} opacity={1}>
                  You are here
                </Tooltip>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
