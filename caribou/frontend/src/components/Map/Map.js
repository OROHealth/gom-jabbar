import GoogleMapReact from "google-map-react";
import "../Map/Map.css"
import IHCHicon from "../../img/IHCH.png"
import Prompt from "../Prompt/Prompt";
import React, {useState} from 'react'

const Map = ({ center, zoom }) => {

  
  function test(){
    setPrompt({show:"true"});
  }
  const[prompt,setPrompt] = useState({show:"false",lat:"0",lng:"0"})

  const apiLoaded = (map,maps) => {
    map.addListener("click", (mapsMouseEvent)=>{
      setPrompt({show:"true",lat:mapsMouseEvent.latLng.lat(),lng:mapsMouseEvent.latLng.lng()});
      console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON()));
      map.setOptions({
        zoomControl: false,
        gestureHandling: 'none'
    });
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
              <img className="icon" src= {IHCHicon} lat="45.50391" lng="-73.5575758"/>
              <Prompt lat={prompt.lat} lng={prompt.lng}/>
            </GoogleMapReact>
        </div>
  );
};

Map.defaultProps = {
  center: { lat: 45.5017, lng: -73.5673 },
  zoom: 12
}


  

export default Map;
