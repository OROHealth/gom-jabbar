import React, { createContext, useState, useEffect } from "react";

//create login context
export const LoggedIn = createContext();

const LoginContext = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  //get auth status
  useEffect(() => {
    fetch("http://localhost:5050/api/caribou/login", {
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((r) => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
      });
  }, []);

  const logOut = () => {
    fetch("http://localhost:5050/api/caribou/signOut", {
      method: "PUT",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "successful") {
          console.log("logout successful");
          setUser({ loggedIn: false });
        } else {
          console.log("couldn't logout");
        }
      });
  };
  //wrap childrens with provider
  return (
    <LoggedIn.Provider value={{ user, setUser, logOut }}>
      {children}
    </LoggedIn.Provider>
  );
};

export default LoginContext;
