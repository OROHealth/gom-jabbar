import React,{useState} from "react";
import "./Navbar.css";
import { motion } from "framer-motion";
import "../../styles.css";
import caribou from "../../img/caribou.svg"
import Auth from "../Auth/Auth"
const NavBar = ({setAuth}) => {
  return (
    <div className="navbar">
      <img src = {caribou} className="mainIcon" alt="Caribou icon"/>

      <motion.button className="menuButton"
        whileHover={{
          scale: 1.1,
          color: "#4787c7",
          border: "1px solid #4787c7"
        }}

        whileTap={{scale: 0.9,
          color: "#4787c7",
          border: "1px solid #4787c7"}
        }
        onClick={()=>{
          setAuth(true)
        }}
      >
        Sign in
      </motion.button>

    </div>
  );
};

export default NavBar;
