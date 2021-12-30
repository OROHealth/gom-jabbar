import React from "react";
import Slider from "@mui/material/Slider";
import "./Prompt.css";
import {motion} from "framer-motion";

const Prompt = ({ lat, lng,enter, leave, submit }) => {
  const handleClick = e =>{
    e.stopPropagation();
    submit();
    
  }
  return (
    <div
      className="slider"
      style={{ width: 130 }}
      onMouseOver={() => {
        enter();
      }}
      onMouseLeave={() => {
        leave();
      }}
      onClick={e=>{e.stopPropagation()}}
    >
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
      {<motion.button
        whileHover={{
          scale: 1.1,
          color: "#4787c7",
          border: "1px solid #4787c7"
        }}

        whileTap={{scale: 0.9,
          color: "#4787c7",
          border: "1px solid #4787c7"}
        }
        onClick={handleClick}
      >
        Submit
      </motion.button>}
    </div>
  );
};

export default Prompt;
