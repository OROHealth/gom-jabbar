import React from 'react';

import "./input.css";

function Input(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="input">
      <input className="input-text" placeholder={props.placeholder} type={props.type || "text"} value={props.value || ""} onChange={handleChange} pattern="\S+"/>
      <label className="input-label">{props.placeholder}</label>
    </div>
  );
}

export default Input;
