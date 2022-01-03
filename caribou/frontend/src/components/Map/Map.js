
import GoogleMapReact from "google-map-react";
import "../Map/Map.css";
import IHCHicon from "../../img/IHCH.png";
import Prompt from "../Prompt/Prompt";
import React, { useState, useContext, useEffect } from "react";
import { LoggedIn } from "../Auth/LoginContext";


const useAuth = () => {
  const { user } = useContext(LoggedIn);
  return user && user.loggedIn;
};



export default function Map({ center, zoom }) {
  console.log("map rerender");
  const { user } = useContext(LoggedIn);
  const isAuth = user && user.loggedIn;

  const [prompt, setPrompt] = useState({ show: false, lat: "0", lng: "0" });
  const [promptHover, setHover] = useState(false);
  const [mapInstance, setMapInstance] = useState(undefined);
  // eslint-disable-next-line
  const [mapsInstance, setMapsInstance] = useState(undefined);
  const [showAuthError, setShowAuthError] = useState(false);
  const [heatMapData, setHeatMapData] = useState({
    positions: [{ lat: 4983649415362, lng: -73.59245921925941 },
    { lat: 34.7, lng: 28.4 }],
    options: {
      radius: 20,
      opacity: 1,
    }
  });




  useEffect(() => {
    try {
      console.log("use effect");
      var points = [];
      fetch("http://localhost:5050/api/human/getAllHumans", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          for (var i = 0; i < data.rows.length; i++) {

            points.push(
              { lat: data.rows[i].lat, lng: data.rows[i].lng });
          }
          setHeatMapData({
            positions: points,
            options: {
              radius: 20,
              opacity: 0.6,
            }
          });
        });
    } catch (err) {
      console.log("error" + err);
    }
  }, [prompt]);


  const apiLoaded = (map, maps) => {

    map.setOptions({
      disableDefaultUI: true,
      clickableIcons: false
    });
    setMapInstance(map);
    setMapsInstance(maps);
    map.addListener("click", (mapsMouseEvent) => {
      console.log(user);
      console.log(user.loggedIn);

      if (!promptHover) {
        setPrompt({
          show: true,
          lat: mapsMouseEvent.latLng.lat(),
          lng: mapsMouseEvent.latLng.lng(),
        });

        setShowAuthError(true);
        console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON()));
      }

    });
  };

  const disableMap = () => {
    setHover(true);
    mapInstance.setOptions({
      gestureHandling: "none", disableDefaultUI: true,
      clickableIcons: false
    });
  }

  const enableMap = () => {
    setHover(false);
    mapInstance.setOptions({
      gestureHandling: "greedy", disableDefaultUI: true,
      clickableIcons: false
    });
  }
  const closePrompt = () => {

    setPrompt({
      show: false,
    });
    mapInstance.setOptions({ gestureHandling: "greedy", disableDefaultUI: true });
  }

  const renderPromt = () => {
    //add if auth once it works properly
    if (isAuth) {
      if (prompt.show) {
        return (<Prompt
          lat={prompt.lat}
          lng={prompt.lng}
          enter={disableMap}
          leave={enableMap}
          submit={closePrompt}
        />)
      }

    }


  }
  const renderError = () => {
    if (!isAuth && showAuthError) {
      console.log("sheesh")
      const timer = setTimeout(() => {
        setShowAuthError(false);
      }, 2000);
      return (<p className="popupError" >You have to be signed-in to report humans</p>)
    }
  }


  return (
    <>{renderError()}
      <div className="map">

        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            libraries: ['visualization']
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps)}
          heatmap={heatMapData}
        >
          <img
            className="icon"
            alt="IHCH headquarters"
            src={IHCHicon}
            lat="45.50391"
            lng="-73.5575758"
            minZoom="10"

          />
          {renderPromt()}
          
        </GoogleMapReact>
      </div></>);
};

Map.defaultProps = {
  center: { lat: 45.5017, lng: -73.5673 },
  zoom: 12,
};

//export default Map;
