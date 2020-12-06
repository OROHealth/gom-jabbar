import {MapContainer, TileLayer} from "react-leaflet";

import UserLocator from './userLocator';

import 'leaflet/dist/leaflet.css';
import './styles.css';

const DEFAULT_ZOOM = 13.5;
const DEFAULT_POSITION = {
  lat: 48.5908666,
  lng: 7.7245304
};

const Map = () => {
  return (
    <MapContainer center={DEFAULT_POSITION} zoom={DEFAULT_ZOOM}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <UserLocator zoom={DEFAULT_ZOOM}/>
    </MapContainer>
  );
};

export default Map;
