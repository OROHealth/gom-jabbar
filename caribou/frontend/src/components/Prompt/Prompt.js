import React, {useState} from "react";
import Slider from "@mui/material/Slider";
import "./Prompt.css";
import {motion} from "framer-motion";

const Prompt = ({ lat, lng,enter, leave, submit }) => {

  const[trashingLevel,setTrashingLevel] = useState(0);
  const[excitementLevel,setExcitementLevel] = useState(0);


  const handleClick = e =>{
    e.stopPropagation();

    fetch("http://localhost:5050/api/human/signal", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({lat,lng,trashingLevel,excitementLevel}),
        }).then(submit());
    
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
        defaultValue={0}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={(e,val) =>setTrashingLevel(val)}
      />
      Level of excitement
      <Slider
        size="small"
        defaultValue={0}
        aria-label="Small"
        valueLabelDisplay="auto"
        onChange={(e,val)=>setExcitementLevel(val)}
      />
      {<motion.button
      className="submit"
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
