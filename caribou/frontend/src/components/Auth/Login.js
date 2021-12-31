import React, { createContext, useState, useEffect} from "react";


export const LoggedIn = createContext();

const LoginContext = ({children}) => {
  const [user, setUser] = useState({ loggedIn: false });
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
  return <LoggedIn.Provider value={{ user, setUser }}>
      {children}
  </LoggedIn.Provider>;
};

export default LoginContext;
