import React, { useEffect, useState } from 'react'
import {motion}from"framer-motion";
import "./ChatStyle.css";
import Caribou from "./Caribou";
const AntlerExchange = () => {
  const [promptHover, setHover] = useState(false);
  const [antlerExchangeStatus, setIsOn] = useState(false);
  const [caribous, setCaribous] = useState([]);
  var temp = [];
  const toggleSwitch = () => {
      setIsOn(!antlerExchangeStatus);
    }
    useEffect(() =>{
        fetch("http://localhost:5050/api/caribou/getAntlerExchanges", {
            method: "GET",
            credentials: "include"}).then((response) => response.json())
            .then((data) => {
                console.log(data);
                for(var i = 0 ; i< data.length;i++){
                    temp.push(<li key={i}>{<Caribou name={data[i].name} key={i} keyVal={i}/>}</li>);
                }
                console.log("before shit hits the fan");
                setCaribous(temp);
            });


    }, [antlerExchangeStatus]);
    useEffect(() => {
        try {
            fetch("http://localhost:5050/api/caribou/signalAntlerExchange", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify({antlerExchangeStatus}),
            })
        } catch (err) {
            console.log("error" + err);
        }
    }, [antlerExchangeStatus]);
    return (
<>
        <div className="antler-exchange">
            <div className="status"><div className="switch" data-isOn={antlerExchangeStatus} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
             
            </div>
            Antler exchange status</div>


        </div>
           <ul className='list'>{caribous}</ul></>

    )
}
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

export default AntlerExchange
