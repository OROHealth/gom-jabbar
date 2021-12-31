import { convertLength } from "@mui/material/styles/cssUtils";
import React, { useState } from "react";
import "./Auth.css";

const Auth = ({ setAuth }) => {
  console.log("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("not crashed...yet");
    console.log(`login attemps with email: ${email} and password ${password}`);
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span
          className="close-icon"
          onClick={() => {
            setAuth(false);
          }}
        >
          x
        </span>
        {signup &&<h1 className="header">Sign Up</h1> }
        {!signup &&<h1 className="header">Sign In</h1> }
        <form className="authForm" onSubmit={handleFormSubmission}>
          <input
            className="entryField"
            type="text"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="entryField"
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button type="submit">Submit</button>
            {!signup && <button onClick={()=>setSignup(true)}>Sign Up?</button>}
            {signup &&<button onClick={()=>setSignup(false)}>Sign In?</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
