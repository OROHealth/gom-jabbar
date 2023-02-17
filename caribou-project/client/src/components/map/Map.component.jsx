import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, CircleMarker } from 'react-leaflet';
import '@components/map/Map.styles.scss';
import { mapBoxApiKey } from '@services/utils/config';
import { useState } from 'react';

const Map = (props) => {
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

      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  const fillBlueOptions = { fillColor: 'blue' };
  const redOptions = { color: 'red' };

  return (
    <div>
      <MapContainer className="map-container" position={position} center={position} zoom={11} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" accessToken={`${mapBoxApiKey}`} />
        <Circle center={circlePosition} pathOptions={fillBlueOptions} radius={1000} />
        <CircleMarker center={circleMarkerPosition} pathOptions={redOptions} radius={30}>
          <Popup>Popup in CircleMarker</Popup>
        </CircleMarker>
        <Marker position={markerPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
