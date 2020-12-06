import {MapContainer, TileLayer} from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import './styles.css';

const Map = () => {
  return (
    <MapContainer center={{lat: 48.5533, lng: 7.75}} zoom={13.5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default Map;
