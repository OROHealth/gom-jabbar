import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyles from "./GlobalStyles";
import CurrentUserProvider from "./CurrentUserContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
