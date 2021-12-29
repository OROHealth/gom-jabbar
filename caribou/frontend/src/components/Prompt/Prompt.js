import React from "react";
import Slider from "@mui/material/Slider";
import "./Prompt.css";
import { motion } from "framer-motion";
import Map from "../Map/Map";

const Prompt = ({ lat, lng,test }) => {
  var bool = "false";
  if(test) bool="true";
  return (
    <div className="slider" style={{ width: 130 }}>
      <h3>Signal human presence</h3>
      Trashing Levels:
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      Level of excitement
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      {bool}
      {/*<motion.button
        whileHover={{
          scale: 1.1,
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
      >
        Submit
      </motion.button>*/}
    </div>
  );
};

export default Prompt;
