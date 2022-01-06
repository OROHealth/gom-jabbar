import React from "react";
import { motion } from "framer-motion";
import "./ChatStyle.css";

//Caribou component, represents the clickable "inbox" with name that the user can use to acces that specific chat
const Caribou = ({ name, email, getInbox }) => {
  return (
    <motion.div
      className="caribou"
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        getInbox(email);
      }}
    >
      {name}
    </motion.div>
  );
};

export default Caribou;
