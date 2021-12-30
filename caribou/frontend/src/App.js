import "./styles.css";
import Navbar from "./components/Navbar/Navbar";
import Map from './components/Map/Map'
import Chat from "./components/Chat/Chat";
import React, { useState } from "react";
import {motion} from "framer-motion";
import chat from "./img/chat.svg";
import map from "./img/map.svg";


function App() {
  const[toggleChat,setToggleChat]= useState(false);

  const renderMapOrChat = () =>{
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
    <div className="App">
      <Navbar />
      {renderMapOrChat()}
      <motion.div className="toggleButton" onClick={()=>setToggleChat(!toggleChat)}>
        {renderIcon()}
      </motion.div>
    </div>
  );
}

export default App;
