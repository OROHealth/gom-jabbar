import {useJsApiLoader, GoogleMap, MarkerF, InfoWindowF} from '@react-google-maps/api';
import Loading from './Loading';
import { useState, useEffect } from "react";
import CommandBox from './CommandBox';
import styled from 'styled-components';
import background from '../images/background.gif';
import human from '../images/human.png';
import caribou from '../images/caribou.png';
import radarImg from "../images/radarImg.gif";
import PageTransition from './PageTransition';
import Eye from '../images/Eye.png';
import {v4 as uuidv4} from "uuid";
const Map=({Logout})=>{

    const [coordinates,setCoordinates]=useState({lat:undefined,lng:undefined});
    const [humans,setHumans]=useState([]);
    const [antlers,setAntlers]=useState([]);
    const [radar,setRadar]=useState();
    const center={lat:45.5019, lng: -73.5674};
    const [map,setMap]=useState(null);
    const [selectedMarker,setSelectedMarker]=useState();
    const [selectedMarker2,setSelectedMarker2]=useState();
    const [open,setOpen]=useState(false);
    const [zonedHumans,setzonedHumans]=useState([]);
    const [flag,setFlag]=useState(0);
  
    //get all human information from mongodb
    useEffect(()=>{
      fetch(`/humans`)
          .then((res) => res.json())
          .then((data) => {
              if(data.data.length!=0){
                setHumans(data.data);
              }
          })
          .catch((error)=>{
              window.alert(error);
          })
    },[])
  
    //get all caribou information from mongodb
    useEffect(()=>{
      fetch(`/caribous`)
          .then((res) => res.json())
          .then((data) => {
              if(data.data.length!=0){
                setAntlers(data.data);
              }
          })
          .catch((error)=>{
              window.alert(error);
          })
    },[])

    // code to make human move by changing the human coordinates randomly per second
    useEffect(() => {
        const intervalId = setInterval(() => {
          let newHumans = [];
          if (humans.length !== 0) {
            humans.map((human) => {
              const newLatMove = Math.random() < 0.7 ? -1 : 1;
              const newLngMove = Math.random() < 0.7 ? -1 : 1;
              const newLat = human.coordinates.lat + 0.005 *newLatMove;
              const newLng = human.coordinates.lng + 0.005*newLngMove;
              const input = {
                coordinates: { lat: newLat, lng: newLng },
                eLevel: human.eLevel,
                tLevel: human.tLevel,
              };
              newHumans.push(input);
            });
            setHumans(newHumans);
          }
        }, 1000);
        return () => clearInterval(intervalId);
    })

    //function to find humans within the given zone
    function toRad(x) {
      return x * Math.PI / 180;
    }


    const findRadardata=()=>{
      setzonedHumans([])
      let newZonedHumans = [];
        if(humans.length!=0){
          humans.map((human,index)=>{
            const dLat = toRad(human.coordinates.lat - radar.coordinates.lat);
            const dLon = toRad(human.coordinates.lng - radar.coordinates.lng);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(human.coordinates.lat)) * Math.cos(toRad(radar.coordinates.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = 6371 * c;
            if((radar.radius)>d){
              newZonedHumans.push(human);
              console.log(zonedHumans);
            }
          })
        }
        setzonedHumans(newZonedHumans);
      }

      //useeffect to update radar every second
      useEffect(() => {
        const intervalId = setInterval(() => {
        findRadardata();
        }, 1000);
        return () => clearInterval(intervalId);
    })
    
    //check if Map has loaded
    const {isLoaded}= useJsApiLoader({
      googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    if(!isLoaded){
      return <Loading/>
    }
  
    //getting coordinates of clicked spot on map
    const mapClick=(e)=>{
      setCoordinates({lat:e.latLng.lat(),lng: e.latLng.lng()})
    }

    //adding humans to map
    const addHumans=(data)=>{
      const input ={coordinates:coordinates,eLevel:data.eLevel,tLevel:data.tLevel};
      setHumans([...humans,input]);
      fetch("/humans",{
          method:"POST",
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
          },
          body:JSON.stringify(input)
      })
      .then(res=>res.json())
      .then((data)=>{
      })
      .catch((error)=>{
          window.alert(error);
      })
    }

    //adding caribous to map
    const addAntlers=(coordinates)=>{
      const id=uuidv4();
      const input={coordinates:coordinates,id:id};
      setAntlers([...antlers,input]);
      fetch("/caribous",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(input)
    })
    .then(res=>res.json())
    .then((data)=>{
    })
    .catch((error)=>{
        window.alert(error);
    })
    }

    //adding radar to map
    const addRadar=(data)=>{
        setFlag(flag+1);
        setzonedHumans([]);
        const input ={coordinates:coordinates,radius:data.radius};
        setRadar(input);
      }

    //close caribou infoWindow;
    const closeWindow=()=>{
      setSelectedMarker(null);
    }
    //close human infoWindow;
    const closeWindow2=()=>{
      setSelectedMarker2(null);
    }

    return (
    <PageTransition> 
      <MainContainer>
      <Header><StyledImage src={Eye}></StyledImage><LogOut onClick={Logout}>Log out</LogOut></Header>
        <ScreenDiv >
          <Container>
            <GoogleMap onLoad={(map) => { setMap(map);}} onClick={e=>mapClick(e)} center={center} zoom={11} mapContainerStyle={{width:'900px', height:'700px'}}>
              {humans&&humans.map((x)=>(
                <MarkerF position={x.coordinates} icon={human} onClick={()=>setSelectedMarker2(x)}/>
              ))}
              {antlers&&antlers.map((antler)=>(
                <MarkerF position={antler.coordinates} icon={caribou} onClick={()=>setSelectedMarker(antler)}/>
              ))}
              {radar&&
                <MarkerF position={radar.coordinates} icon={radarImg} />
              }
              {selectedMarker2&&
              <InfoWindowF position={selectedMarker2.coordinates} >
                <InfoDiv><p>Excitement Level : {selectedMarker2.eLevel}</p><p> Thrashing Level: {selectedMarker2.tLevel}</p><CloseButton2 onClick={closeWindow2}>x</CloseButton2></InfoDiv>
              </InfoWindowF>}
              {selectedMarker&&
              <InfoWindowF position={selectedMarker.coordinates} >
                <div><p onClick={()=>setOpen(true)}>{selectedMarker.id}</p><CloseButton onClick={closeWindow}>x</CloseButton></div>
              </InfoWindowF>}
            </GoogleMap>
  
            <CommandBox 
            coordinates={coordinates} 
            addHumans={addHumans} 
            addAntlers={addAntlers}
            addRadar={addRadar}
            zonedHumans={zonedHumans}
            setzonedHumans={setzonedHumans}
            />
          </Container>
        </ScreenDiv>
      </MainContainer>
      </PageTransition>
    );
  }
  
  const MainContainer=styled.div`
  height: 100vh;
  `
  const ScreenDiv=styled.div`
  padding-left: 40px;
  padding-right:40px;
  padding-top:10px;
  `
  const Container=styled.div`
  display: flex;
  flex: row;
  justify-content: space-between;
  
  `
  const CloseButton=styled.button`
  position: absolute;
  top: -1px;
  left:225px;
  border: none;
  background-color: white;
  z-index: 100;
  `
  const CloseButton2=styled.button`
  position: absolute;
  top: -3px;
  left:250px;
  border: none;
  background-color: white;
  z-index: 100;
  `
  const Header=styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right:40px;
  padding-top:10px;
  `
  const StyledImage=styled.img`
  width:50px;
  `
  const LogOut=styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  &:hover{
    color:grey;
  }
  `
  const InfoDiv=styled.div`
  width:240px;
  height:50px;
  `

export default Map;