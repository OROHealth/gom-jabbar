import React, {useState} from 'react';

import "./input.css";

function Login(props) {
  const [value, setValue] = useState(props.value);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div className="input">
      <input className="input-text" placeholder={props.placeholder} type={props.type || "text"} value={value} onChange={handleChange} pattern="\S+"/>
      <label className="input-label">{props.placeholder}</label>
    </div>
  );
}

export default Login;
