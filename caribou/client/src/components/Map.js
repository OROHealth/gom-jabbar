import {useJsApiLoader, GoogleMap, MarkerF, InfoWindowF} from '@react-google-maps/api';
import Loading from './Loading';
import { useState, useEffect } from "react";
import CommandBox from './CommandBox';
import styled from 'styled-components';
import background from '../images/background.gif';
import human from '../images/human.png';
import caribou from '../images/caribou.png';
import radarImg from "../images/radarImg.gif";
import LiveChat from './LiveChat';
import PageTransition from './PageTransition';
import Eye from '../images/Eye.png'
const Map=({Logout})=>{

    const [coordinates,setCoordinates]=useState({lat:undefined,lng:undefined});
    const [humans,setHumans]=useState([]);
    const [antlers,setAntlers]=useState([]);
    const [radar,setRadar]=useState();
    const center={lat:45.5019, lng: -73.5674};
    const [map,setMap]=useState(null);
    const [selectedMarker,setSelectedMarker]=useState();
    const [open,setOpen]=useState(false);
    const [zonedHumans,setzonedHumans]=useState([]);
    const [flag,setFlag]=useState(0);
  
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

    const findRadardata=()=>{
      setzonedHumans([])
      let newZonedHumans = [];
        if(humans.length!=0){
          humans.map((human,index)=>{
            const latitude_dist = human.coordinates.lat - radar.coordinates.lat;
            const longitude_dist = human.coordinates.lng - radar.coordinates.lng;
            const dist = Math.pow(Math.pow(longitude_dist, 2) + Math.pow(latitude_dist, 2), 0.5);
            
            if((radar.radius*0.001)>dist){
              // console.log(human);
              newZonedHumans.push(human);
              console.log(zonedHumans);

            }
          })
        }
        setzonedHumans(newZonedHumans);
      }
      useEffect(() => {
        const intervalId = setInterval(() => {
        findRadardata();
        }, 1000);
        return () => clearInterval(intervalId);
    })
      
    const {isLoaded}= useJsApiLoader({
      googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    })

    if(!isLoaded){
      return <Loading/>
    }
  
    const mapClick=(e)=>{
      setCoordinates({lat:e.latLng.lat(),lng: e.latLng.lng()})
    }

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
    const addAntlers=(coordinates)=>{
      const input={coordinates:coordinates};
      setAntlers([...antlers,input]);
      fetch("/caribous",{
        method:"POST",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(coordinates)
    })
    .then(res=>res.json())
    .then((data)=>{
    })
    .catch((error)=>{
        window.alert(error);
    })
    }

    const addRadar=(data)=>{
        setFlag(flag+1);
        setzonedHumans([]);
        const input ={coordinates:coordinates,radius:data.radius};
        setRadar(input);
      }


    const closeWindow=()=>{
      setSelectedMarker(null);
    }
  
 


  
    return (
    <PageTransition> 
      <MainContainer>
      <Header><StyledImage src={Eye}></StyledImage><LogOut onClick={Logout}>Log out</LogOut></Header>
        <ScreenDiv >
          <Container>
            <GoogleMap onLoad={(map) => { setMap(map);}} onClick={e=>mapClick(e)} center={center} zoom={11} mapContainerStyle={{width:'900px', height:'700px'}}>
              {humans&&humans.map((x)=>(
                <MarkerF position={x.coordinates} icon={human}/>
              ))}
              {antlers&&antlers.map((antler)=>(
                <MarkerF position={antler.coordinates} icon={caribou} onClick={()=>setSelectedMarker(antler)}/>
              ))}
              {radar&&
                <MarkerF position={radar.coordinates} icon={radarImg} />
              }
              {selectedMarker&&
              <InfoWindowF position={selectedMarker.coordinates} >
                <div><button onClick={()=>setOpen(true)}>Antler-Exchange</button><CloseButton onClick={closeWindow}>x</CloseButton></div>
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
          <Footer>
            <LiveChat setOpen={setOpen} open={open}/>
          </Footer>
  
        </ScreenDiv>
      </MainContainer>
      </PageTransition>
    );
  }
  
  const MainContainer=styled.div`
  height: 100vh;
  `
  const ScreenDiv=styled.div`
  /* background-image: url(${background}); */
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
  top: -3px;
  border: none;
  background-color: white;
  z-index: 100;
  `
  const Footer=styled.div`
  display:flex;
  flex-direction: row;
  justify-content: end;
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

export default Map;