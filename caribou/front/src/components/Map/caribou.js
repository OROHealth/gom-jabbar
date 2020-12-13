import {Marker} from "react-leaflet";
import {Icon} from 'leaflet';

const CaribouIcon = new Icon({
  iconUrl: './caribou_single.png',
  iconSize:     [75, 75],
  shadowSize:   [50, 64],
  iconAnchor:   [35, 50],
  shadowAnchor: [4, 62],
  popupAnchor:  [-3, -76]
});

const Caribou = (props) => {
  return (
    <Marker position={props.position} icon={CaribouIcon}/>
  );
};

export default Caribou;
