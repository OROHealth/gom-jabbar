import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./ChatStyle.css";
import Caribou from "./Caribou";

//allows control by the user of the antler exchange status, as well as display all the other caribous that are ready to antler exchange
const AntlerExchange = () => {
  //states
  const [antlerExchangeStatus, setIsOn] = useState(false);
  const [caribous, setCaribous] = useState([]);
  const [inboxId, setInboxId] = useState();

  const toggleSwitch = () => {
    setIsOn(!antlerExchangeStatus);
  };

  const getInbox = (email) => {
    console.log(`getting the inbox for email: ${email}`);
  };
  //gets and displays all caribous that are ready to antler exchange
  useEffect(() => {
    var temp = []; //stores heatmap points

    fetch("http://localhost:5050/api/caribou/getAntlerExchanges", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          temp.push(
            <li key={i}>
              {
                <Caribou
                  name={data[i].name}
                  email={data[i].email}
                  key={i}
                  keyVal={i}
                  getInbox={getInbox}
                />
              }
            </li>
          );
        }
        setCaribous(temp);
      });
  }, []);
  //sets the antler exchange status to what was selected by the user
  useEffect(() => {
    try {
      fetch("http://localhost:5050/api/caribou/signalAntlerExchange", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ antlerExchangeStatus }),
      });
    } catch (err) {
      console.log("error" + err);
    }
  }, [antlerExchangeStatus]);

  return (
    <>
      <div className="antler-exchange">
        <div className="status">
          <div
            className="switch"
            data-isOn={antlerExchangeStatus}
            onClick={toggleSwitch}
          >
            <motion.div className="handle" layout transition={spring} />
          </div>
          Antler exchange status
        </div>

        <ul className="list">{caribous}</ul>
      </div>
    </>
  );
};

//animation constants
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

export default AntlerExchange;
