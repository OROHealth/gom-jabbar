import React from "react";
import "./ChatStyle.css";

//message component, represents a single message
//Work in progress
const Message = (props) => {
  if (props.sent === "true") {
    return <div className="message-sent">{props.message}</div>;
  } else {
    return <div className="message-received">{props.message}</div>;
  }
};

export default Message;
