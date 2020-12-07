import React, { useState } from "react";
import styled from "styled-components";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
  const [center, setCenter] = useState({
    lat: 45.5017,
    lng: -73.5673,
  });
  const handleMapClick = (event) => {
    console.log(event);
  };
  return (
    <Wrapper>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAPS_KEY}
        onLoad={() => {
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
              key={human.time.toISOString()}
              position={{ lat: human.lat, lng: human.lng }}
            />
          ))}
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
export default Map;
