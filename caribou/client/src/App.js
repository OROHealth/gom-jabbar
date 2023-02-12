import {useJsApiLoader, GoogleMap, MarkerF} from '@react-google-maps/api';
import Loading from './components/Loading';
import Signup from './components/Signup';
import { useState } from "react";
import CommandBox from './components/CommandBox';
import styled from 'styled-components';
import background from './images/background.gif'

const App=()=> {

  const [user,setUser]=useState({email:''});
  const [error,setError]=useState("");
  const [coordinates,setCoordinates]=useState('');
  const [humans,setHumans]=useState([{data:{lat:45.5019, lng: -73.5674}}]);
  const center={lat:45.5019, lng: -73.5674};

  const {isLoaded}= useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  if(!isLoaded){
    return <Loading/>
  }
  const mapClick=(e)=>{
    setCoordinates({lat:e.latLng.lat(),lng: e.latLng.lng()})
    console.log(coordinates);
  }
  const Login =(details)=>{
    setUser({email:details.email});
  }
  const Logout =()=>{
      setUser({email:''});
  }
  const addHuman=(coordinates)=>{
    const array=[];
    array.push(humans);
    array.push(coordinates);
    setHumans(array);
  }
  console.log(humans);
  return (
    <div>
      {(user.email!='')?
      <ScreenDiv >
        <Container>
          <GoogleMap onClick={e=>mapClick(e)} center={center} zoom={11} mapContainerStyle={{width:'900px', height:'700px'}}>
            {humans&&humans.map((human)=>(
              <MarkerF  position={human.data}/>
            ))}
          </GoogleMap>

          <CommandBox coordinates={coordinates} addHuman={addHuman}/>
        </Container>
        <button onClick={Logout}>Log out</button>
      </ScreenDiv>
      :<Signup Login={Login} error={error}/>}
    </div>
  );
}

const ScreenDiv=styled.div`
background-image: url(${background});
`
const Container=styled.div`
display: flex;
flex: row;
justify-content: space-between;
`

export default App;
