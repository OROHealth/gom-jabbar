import {Circle, Marker, Popup} from "react-leaflet";
import {Icon} from 'leaflet';

const HumanIcon = new Icon({
  iconUrl: './human.png',
  iconSize:     [50, 50],
  shadowSize:   [50, 64],
  iconAnchor:   [25, 25],
  shadowAnchor: [4, 62],
  popupAnchor:  [-3, -76]
});

const Human = (props) => {
  return (
    <Circle
      color={"orange"}
      center={props.position}
      radius={props.excitementLevel}>
      <Marker position={props.position} icon={HumanIcon}>
        <Popup>
          <input type="text" value={props.trashingLevel}/>
        </Popup>
      </Marker>
    </Circle>
  );
};

export default Human;
