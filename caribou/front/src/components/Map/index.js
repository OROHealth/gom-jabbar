import {MapContainer, TileLayer} from "react-leaflet";
import {useSelector} from "react-redux";

import TrashZone from './trashZone';
import UserLocator from './userLocator';

import 'leaflet/dist/leaflet.css';
import './styles.css';

const DEFAULT_ZOOM = 13.5;
const DEFAULT_POSITION = {
  lat: 48.5908666,
  lng: 7.7245304
};

const Map = () => {
  const trashZone = useSelector(s => s.trashZone);
  return (
    <MapContainer center={DEFAULT_POSITION} zoom={DEFAULT_ZOOM}>
      {trashZone &&
      <TrashZone
        position={{
          lat: trashZone.lat,
          lng: trashZone.lng
        }}
        radius={trashZone.radius}
      />
      }
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <UserLocator zoom={DEFAULT_ZOOM}/>
    </MapContainer>
  );
};

export default Map;
