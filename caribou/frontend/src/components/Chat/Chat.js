import React, { useContext } from "react";
import Feed from "./Feed";
import "./ChatStyle.css";
import AntlerExchange from "./AntlerExchange";
import { LoggedIn } from "../Auth/LoginContext";

const Chat = () => {
  //user login context
  const { user } = useContext(LoggedIn);
  const isAuth = user && user.loggedIn;
  const renderError = () => {
    if (!isAuth) {
      //hide error after 2 seconds
      return (
        <p className="popupError">
          You have to be signed-in to have access to chat functionalities
        </p>
      );
    } else {
      return (
        <>
          <AntlerExchange /> <Feed />
        </>
      );
    }
  };

  return <div className="chat">{renderError()}</div>;
};

export default Chat;
