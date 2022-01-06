import React from "react";
import { motion } from "framer-motion";

//Caribou component, represents the clickable "inbox" with name that the user can use to acces that specific chat
const Caribou = ({ onClick, name, keyVal }) => {
  return (
    <motion.div
      className="caribou"
      whileHover={{
        scale: 1.1,
      }}
      key={keyVal}
      whileTap={{ scale: 0.9 }}
    >
      {name}
    </motion.div>
  );
};

export default Caribou;
