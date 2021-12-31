import GoogleMapReact from "google-map-react";
import "../Map/Map.css";
import IHCHicon from "../../img/IHCH.png";
import Prompt from "../Prompt/Prompt";
import React, { useState } from "react";

const Map = ({ center, zoom }) => {

  const [prompt, setPrompt] = useState({ show: false, lat: "0", lng: "0" });
  const [promptHover, setHover] = useState(false);
  const [mapInstance, setMapInstance] = useState(undefined);

  const apiLoaded = (map, maps) => {
    map.setOptions({ disableDefaultUI: true });
    setMapInstance(map);
    map.addListener("click", (mapsMouseEvent) => {
      console.log(promptHover);
      if(!promptHover){
      setPrompt({
        show: true,
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      });
      console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON()));
    }
    });
  };

  const disableMap = () =>{
    setHover(true);
    mapInstance.setOptions({ gestureHandling: "none", disableDefaultUI: true });
    console.log("toggle hovering");
  }

  const enableMap = () =>{
    setHover(false);
    mapInstance.setOptions({ gestureHandling: "greedy", disableDefaultUI: true});
    console.log("toggle hovering");
  }
  const closPrompt = () =>{
    setPrompt({
      show: false,
    });
    mapInstance.setOptions({ gestureHandling: "greedy", disableDefaultUI: true});
  }

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps)}
      >
        <img
          className="icon"
          alt="IHCH headquarters"
          src={IHCHicon}
          lat="45.50391"
          lng="-73.5575758"
          minZoom="10"
          
        />
        {prompt.show&&<Prompt
          lat={prompt.lat}
          lng={prompt.lng}
          enter={disableMap}
          leave={enableMap}
          submit={closPrompt}
        />}
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: { lat: 45.5017, lng: -73.5673 },
  zoom: 12,
};

export default Map;
