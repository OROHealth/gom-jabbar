import React from "react";
import "./Navbar.css";
import { motion } from "framer-motion";
import "../../styles.css";
import caribou from "../../img/caribou.svg"
const NavBar = () => {
  return (
    <div className="navbar">
      <img src = {caribou} className="mainIcon" alt="Caribou icon"/>
      <motion.button className="menuButton"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 4px rgb(255,255,255)",
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
      >
        Sign in
      </motion.button>

      <motion.button className="menuButton"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 4px rgb(255,255,255)",
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
      >
        Sign in
      </motion.button>

      <motion.button className="menuButton"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 4px rgb(255,255,255)",
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
      >
        Sign in
      </motion.button>

      <motion.button className="menuButton"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 4px rgb(255,255,255)",
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
      >
        Sign in
      </motion.button>

      <motion.button className="menuButton"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 4px rgb(255,255,255)",
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
      >
        Sign in
      </motion.button>
    </div>
  );
};

export default NavBar;
