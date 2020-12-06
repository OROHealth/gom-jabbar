import {useMap} from "react-leaflet";
import {usePosition} from "use-position";
import {useEffect} from "react";


const UserLocator = ({zoom}) => {
  const map = useMap();
  const {latitude, longitude} = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      map.flyTo([latitude, longitude], zoom, {animate: false});
    }
  }, [latitude, longitude, map, zoom]);

  return null
};

export default UserLocator;
