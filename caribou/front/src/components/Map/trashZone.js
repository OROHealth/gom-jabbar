import {Circle} from "react-leaflet";

const TrashZone = (props) => {
  return (
    <Circle
      color={"red"}
      center={props.position}
      radius={props.radius}>
    </Circle>
  )
};

export default TrashZone;
