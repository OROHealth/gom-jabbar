import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '@components/map/Map.styles.scss';
import { mapBoxApiKey } from '@services/utils/config';

const Map = (props) => {
  const position = [45.49898, -73.647124];
  const markerPosition = [45.524403, -73.7436546];

  return (
    <div>
      <MapContainer className="map-container" position={position} center={position} zoom={11} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" accessToken={`${mapBoxApiKey}`} />
        <Marker position={markerPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
