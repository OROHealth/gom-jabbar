import GoogleMapReact from "google-map-react";
import "../Map/Map.css"
import IHCHicon from "../../img/IHCH.png"
import { process_params } from "express/lib/router";
const Map = ({ center, zoom }) => {
  return (
    <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY }}
                defaultCenter={ center }
                defaultZoom={ zoom }
            >
              <img className="icon" src= {IHCHicon} lat="45.50391" lng="-73.5575758"></img>
            </GoogleMapReact>
        </div>
  );
};

Map.defaultProps = {
  center: { lat: 45.5017, lng: -73.5673 },
  zoom: 12
}
  

export default Map;
