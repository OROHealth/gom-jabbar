import React from 'react';

import "./button.css";

function Button(props) {
  return (
    <button className={`button ${props.wrap ? "noMinSize" : ""}`} onClick={props.onClick}>{props.children}</button>
  );
}

export default Button;
