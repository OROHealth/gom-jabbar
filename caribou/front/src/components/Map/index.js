import {useEffect} from 'react';
import {MapContainer, TileLayer, useMap} from "react-leaflet";
import {usePosition} from 'use-position';

import 'leaflet/dist/leaflet.css';
import './styles.css';

const DEFAULT_ZOOM = 13.5;
const DEFAULT_POSITION = {
  lat: 48.5908666,
  lng: 7.7245304
};

const UserLocator = () => {
  const map = useMap();
  const {latitude, longitude} = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], DEFAULT_ZOOM, {animate: false});
    }
  }, [latitude, longitude, map]);

  return null
};

const Map = () => {
  return (
    <MapContainer center={DEFAULT_POSITION} zoom={DEFAULT_ZOOM}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <UserLocator/>
    </MapContainer>
  );
};

export default Map;
