import GoogleMapReact from "google-map-react";
import "../Map/Map.css"
import IHCHicon from "../../img/IHCH.png"

const Map = ({ center, zoom }) => {

  const apiLoaded = (map,maps) => {
    map.addListener("click", (mapsMouseEven)=>{
      console.log(JSON.stringify(mapsMouseEven.latLng.toJSON()));
    })
  };
  return (
    <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_API_KEY }}
                defaultCenter={ center }
                defaultZoom={ zoom }
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps)}
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
