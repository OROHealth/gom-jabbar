import {useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api';
import Loading from './Loading';
import Signup from './components/Signup';
import { useState } from "react";
const App=()=> {

  const [user,setUser]=useState({email:''});
  const [error,setError]=useState("");
  const center={lat:48.8584, lng: 2.2945};

  const {isLoaded}= useJsApiLoader({
    googleMapsApiKey:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  if(!isLoaded){
    return <Loading/>
  }
  
  const Login =(details)=>{
    setUser({email:details.email});
  }
  const Logout =()=>{
      setUser({email:''});
  }
  return (
    <div>
      {(user.email!='')?
      <div>
        <GoogleMap center={center} zoom={15} mapContainerStyle={{width:'900px', height:'700px'}}>
          <Marker position ={center}/>
        </GoogleMap>
        <button onClick={Logout}>Log out</button>
      </div>
      :<Signup Login={Login} error={error}/>}
    </div>
  );
}

export default App;
