import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import jb from "../assets/jb.png";
import { Button, Title } from "../components/index.js";
import MapModal from "../MapModal";

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
  const [humanModal, setHumanModal] = useState(false);
  const [trashingLevel, setTrashingLevel] = useState("");
  const [excitementLevel, setExcitementLevel] = useState("");
  const [humanPosition, setHumanPosition] = useState(null);
  const [center, setCenter] = useState({
    //default center of map is middle of montreal
    lat: 45.5017,
    lng: -73.5673,
  });
  useEffect(() => {
    //gets info on all those pesky humans
    fetch("/humans")
      .then((res) => res.json())
      .then((data) => setHumans(data.data));
  }, []);

  const handleDeleteHuman = () => {
    fetch("/deletehuman", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: selected._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setHumans(humans.filter((human) => human._id !== selected._id));
          setSelected(null);
        } else {
          console.log("ERROR");
        }
      });
  };
  const handleAddHuman = () => {
    const newHuman = {
      position: humanPosition,
      date: new Date(),
      trashingLevel: +trashingLevel,
      excitementLevel: +excitementLevel,
    };
    fetch("/addhuman", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHuman),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          setTrashingLevel("");
          setExcitementLevel("");
          setHumanModal(false);
          setHumans([...humans, newHuman]);
        } else {
          console.log("ERROR");
        }
      });
  };
  const handleMapClick = (event) => {
    setHumanPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    setHumanModal(true);
  };
  return (
    <Wrapper>
      <MapModal
        trashingLevel={trashingLevel}
        setTrashingLevel={setTrashingLevel}
        excitementLevel={excitementLevel}
        setExcitementLevel={setExcitementLevel}
        humanModal={humanModal}
        setHumanModal={setHumanModal}
        handleAddHuman={handleAddHuman}
      />
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
        <Title>Trash + Human Map</Title>
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
                <p>Excitement level: {selected.excitementLevel}</p>
                <button onClick={handleDeleteHuman}>Human has left</button>
              </Info>
            </InfoWindow>
          ) : null}
        </GoogleMap>
        <P>
          Click on the map to signal the location of a human currently trashing
          our world!
        </P>
      </LoadScript>
    </Wrapper>
  );
};

const P = styled.p`
  margin: 10px 25px;
  font-size: large;
`;
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
