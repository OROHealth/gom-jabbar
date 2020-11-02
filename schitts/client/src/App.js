
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import MockPage from "./MockPage"

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
          <MockPage/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
