import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import jb from "../assets/jb.png";

const containerStyle = {
  width: "350px",
  height: "300px",
  border: "4px solid #020826",
  borderRadius: "6px",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const [humans, setHumans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState({
    //default center is montreal
    lat: 45.5017,
    lng: -73.5673,
  });

  const handleMapClick = (event) => {
    console.log(event);
    console.log(humans);
  };
  useEffect(() => {
    fetch("/humans")
      .then((res) => res.json())
      .then((data) => setHumans(data.data));
  }, []);
  return (
    <Wrapper>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
        onLoad={() => {
          //if user accepts location services, map recenters on user's location
          navigator.geolocation.getCurrentPosition(function (position) {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={options}
          onClick={handleMapClick}
        >
          {humans.map((human) => (
            <Marker
              key={human._id}
              position={human.position}
              icon={{
                url: jb,
                scaledSize: new window.google.maps.Size(30, 35),
              }}
              onClick={() => setSelected(human)}
            />
          ))}
          {selected ? (
            <InfoWindow
              position={selected.position}
              onCloseClick={() => setSelected(null)}
            >
              <Info>
                <h2>Trashy Human!</h2>
                <p>Trash level: {selected.trashingLevel}</p>
              </Info>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </LoadScript>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Info = styled.div`
  h2 {
    font-weight: bold;
    margin-bottom: 4px;
  }
`;
export default Map;
