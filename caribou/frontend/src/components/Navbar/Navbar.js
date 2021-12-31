import React, { useState, useContext } from "react";
import "./Navbar.css";
import { motion } from "framer-motion";
import "../../styles.css";
import caribou from "../../img/caribou.svg";
import Auth from "../Auth/Auth";
import { LoggedIn } from "../Auth/LoginContext";
const useAuth = () => {
  const { user } = useContext(LoggedIn);
  return user && user.loggedIn;
};

const logOut = (setUser) => {
  fetch("http://localhost:5050/api/caribou/signOut", {
        method: "PUT",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.status==="successful"){
            console.log("logout successful");
            setUser({loggedIn:false});
          }
          else{
            console.log("couldn't logout")
          }
        });

}

const Button = ({setAuth}) => {
  const isAuth = useAuth();
  if (!isAuth) {
    return (
      <motion.button
        className="menuButton"
        whileHover={{
          scale: 1.1,
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
        whileTap={{ scale: 0.9, color: "#4787c7", border: "1px solid #4787c7" }}
        onClick={() => {
          setAuth(true);
        }}
      >
        Sign in
      </motion.button>
    );
  } else {
    return (
      <motion.button
        className="menuButton"
        whileHover={{
          scale: 1.1,
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
        whileTap={{ scale: 0.9, color: "#4787c7", border: "1px solid #4787c7" }}
        onClick={()=>logOut()}
      >
        Sign Out
      </motion.button>
    );
  }
};

const NavBar = ({ setAuth }) => {
  const isAuth = useAuth();
  return (
    <div className="navbar">
      <img src={caribou} className="mainIcon" alt="Caribou icon" />
      {Button({setAuth})}
    </div>
  );
};

export default NavBar;
