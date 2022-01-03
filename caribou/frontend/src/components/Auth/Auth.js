import React, { useState, useContext } from "react";
import { LoggedIn } from "./LoginContext";
import {motion} from "framer-motion";
import "./Auth.css";

const Auth = ({ setAuthPopup }) => {
  const { setUser } = useContext(LoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);

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
        body: JSON.stringify({ email, password }),
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
            setAuthPopup(false);
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
        body: JSON.stringify({ name, email, password })
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

            console.log(`Successful login and Sign up`);
            setAuthPopup(false);
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
            setAuthPopup(false);
          }}
        >
          x
        </span>
        {signup && <h1 className="header">Sign Up</h1>}
        {!signup && <h1 className="header">Sign In</h1>}
        <div className="error">{error}</div>
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
            <motion.button className="submit" type="submit" whileHover={{
          scale: 1.1,
          color: "#4787c7",
          border: "1px solid #4787c7",
        }}
        whileTap={{ scale: 0.9, color: "#4787c7", border: "1px solid #4787c7" }}>Submit</motion.button>
            {!signup && (
              <motion.button className="submit" onClick={() => setSignup(true)}whileHover={{
                scale: 1.1,
                color: "#4787c7",
                border: "1px solid #4787c7",
              }}
              whileTap={{ scale: 0.9, color: "#4787c7", border: "1px solid #4787c7" }}>Sign Up?</motion.button>
            )}
            {signup && (
              <motion.button className="submit" onClick={() => setSignup(false)}whileHover={{
                scale: 1.1,
                color: "#4787c7",
                border: "1px solid #4787c7",
              }}
              whileTap={{ scale: 0.9, color: "#4787c7", border: "1px solid #4787c7" }}>Sign In?</motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
