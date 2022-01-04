import React from 'react';
import "./ChatStyle.css";
import send from "./../../img/send.svg"
const messageInput = () => {
    return (
        <div className="input">
          <input className="textBox" type="text" placeholder="Type a message..." />
          <img src={send} className="sendIcon" alt="Caribou icon" />
        </div>
    )
}

export default messageInput
