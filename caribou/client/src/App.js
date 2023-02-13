import {useJsApiLoader, GoogleMap, MarkerF} from '@react-google-maps/api';
import Loading from './components/Loading';
import Signup from './components/Signup';
import { useState, useEffect } from "react";
import CommandBox from './components/CommandBox';
import styled from 'styled-components';
import background from './images/background.gif';
import human from './images/human.png';
import caribou from './images/caribou.png';
import radarImg from "./images/radarImg.gif";


const App=()=> {

  const [user,setUser]=useState({email:'as'});
  const [error,setError]=useState("");
  const [coordinates,setCoordinates]=useState({lat:undefined,lng:undefined});
  const [humans,setHumans]=useState([]);
  const [antlers,setAntlers]=useState([]);
  const [radar,setRadar]=useState();
  const center={lat:45.5019, lng: -73.5674};
  const [map,setMap]=useState(null);
  const [bounds,setBounds]=useState(null);

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
console.log(humans);
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
  const {isLoaded}= useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  if(!isLoaded){
    return <Loading/>
  }

  const mapClick=(e)=>{
    setCoordinates({lat:e.latLng.lat(),lng: e.latLng.lng()})
  }
  const Login =(details)=>{
    setUser({email:details.email});
  }
  const Logout =()=>{
      setUser({email:''});
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
    setAntlers([...antlers,coordinates]);
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
    const input ={coordinates:coordinates,radius:data.radius};
    setRadar(input);
    findRadardata();
  }

  const findRadardata=()=>{
    if(humans.length!=0){
      humans.map((human)=>{
        const latitude_dist = human.coordinates.lat - radar.coordinates.lat;
        const longitude_dist = human.coordinates.lng - radar.coordinates.lng;
        const dist = Math.pow(Math.pow(longitude_dist, 2) + Math.pow(latitude_dist, 2), 0.5);
        // console.log(latitude_dist);
        // console.log(longitude_dist);
        // console.log(dist);
        if((radar.radius*0.001)>dist){
          console.log(human.coordinates.lat);
        }
      })
    }
  }

  return (
    <div>
      {(user.email!='')?
      <ScreenDiv >
        <Container>

          <GoogleMap onLoad={(map) => { setMap(map);}} onClick={e=>mapClick(e)} center={center} zoom={11} mapContainerStyle={{width:'900px', height:'700px'}}>
            {humans&&humans.map((x)=>(
              <MarkerF position={x.coordinates} icon={human}/>
            ))}
            {antlers&&antlers.map((antler)=>(
              <MarkerF position={antler.coordinates} icon={caribou}/>
            ))}
            {radar&&
              <MarkerF position={radar.coordinates} icon={radarImg} />
            }
          </GoogleMap>

          <CommandBox 
          coordinates={coordinates} 
          addHumans={addHumans} 
          addAntlers={addAntlers}
          addRadar={addRadar}
          />
        </Container>
        <button onClick={Logout}>Log out</button>
      </ScreenDiv>
      :<Signup Login={Login} error={error}/>}
    </div>
  );
}

const ScreenDiv=styled.div`
background-image: url(${background});
padding: 40px;
`
const Container=styled.div`
display: flex;
flex: row;
justify-content: space-between;
`

export default App;
