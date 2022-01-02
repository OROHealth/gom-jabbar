import "./styles.css";
import Login, { LoggedIn } from "./components/Auth/LoginContext";
import Navbar from "./components/Navbar/Navbar";
import Map from './components/Map/Map'
import Auth from './components/Auth/Auth'
import Chat from "./components/Chat/Chat";
import React, { useState } from "react";
import {motion} from "framer-motion";
import chat from "./img/chat.svg";
import map from "./img/map.svg";



function App() {
  const[toggleChat,setToggleChat]= useState(false);
  const[authPopUp,setAuthPopup] = useState(false);
  const [isSignedIn,setSignIn] = useState(false);

  const renderMapOrChat = () =>{
    //TODO restore map to same zoom and position after opening the chats
    if(toggleChat){
      return <Chat/>;
    }
    else{
      return <Map/>;
    }
  }

  const renderIcon = () =>{
    if(toggleChat){
      return <img className="toggleIcon" src={map} alt="chat button"/>;
    }
    else{
      return <img className="toggleIcon" src={chat} alt="map button"/>;
    }
  }

  return (
    <Login  test={isSignedIn,setSignIn}>
    
    <div className="App">
      <Navbar className="nav" setAuthPopup={setAuthPopup} />
      {renderMapOrChat()}
      <motion.div className="toggleButton" onClick={()=>setToggleChat(!toggleChat)}>
        {renderIcon()}
      </motion.div>
      {authPopUp && <Auth setAuthPopup={setAuthPopup}/>}
    </div>
    </Login>
  );
}

export default App;
