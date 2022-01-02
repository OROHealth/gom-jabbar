import React, { useContext } from "react";
import "./Navbar.css";
import { motion } from "framer-motion";
import "../../styles.css";
import caribou from "../../img/caribou.svg";
import { LoggedIn } from "../Auth/LoginContext";
const useAuth = () => {
  const { user } = useContext(LoggedIn);
  return user && user.loggedIn;
};



const Button = ({setAuthPopup}) => {
  const { logOut } = useContext(LoggedIn);
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
          setAuthPopup(true);
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

const NavBar = ({ setAuthPopup }) => {
  return (
    <div className="navbar">
      <img src={caribou} className="mainIcon" alt="Caribou icon" />
      {Button({setAuthPopup})}
    </div>
  );
};

export default NavBar;
