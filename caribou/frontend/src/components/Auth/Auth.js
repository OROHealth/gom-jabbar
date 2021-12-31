import { convertLength } from "@mui/material/styles/cssUtils";

import React, { useState, useContext } from "react";
import { LoggedIn } from "./LoginContext";
import "./Auth.css";

const Auth = ({ setAuth }) => {
  const { setUser } = useContext(LoggedIn);
  const isAuth = setUser && setUser.loggedIn;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const[error, setError] = useState(null);
  const[name,setName]= useState(null);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!signup) {
      //SIGNIN
      //TODO handle and display signin errors
      console.log(`Signing in with email ${email}`);
      fetch("http://localhost:5050/api/caribou/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email,password}),
        })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) return;
            setUser({ ...data });
            if (data.status) {
              setError(data.status);
            } else if (data.loggedIn) {
              console.log("Successful login");
              setAuth(false);
            }
          });
    } else {
      //SIGNUP
      //TODO handle and display signup errors
      console.log(`Signing up with email ${email}`);
      fetch("http://localhost:5050/api/caribou/signup", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name,email,password})
        })
          .catch(err => {
            return;
          })
          .then(res => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then(data => {
            if (!data) return;
            setUser({ ...data });
            if (data.status) {
              setError(data.status);
            } else if (data.loggedIn) {
              
              console.log(`Successful login and Sign up ${setUser}`);
              setAuth(false);
            }
          });
    }
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
        {signup && <h1 className="header">Sign Up</h1>}
        {!signup && <h1 className="header">Sign In</h1>}
        <form className="authForm" onSubmit={handleFormSubmission}>
        {signup && <input
            className="entryField"
            type="text"
            placeholder="Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />}
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
            {!signup && (
              <button onClick={() => setSignup(true)}>Sign Up?</button>
            )}
            {signup && (
              <button onClick={() => setSignup(false)}>Sign In?</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
