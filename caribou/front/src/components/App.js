import * as R from "ramda";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import Map from "./Map";
import Banner from "./Banner";
import Modal from "./Modal";
import Login from "./Account/Login";
import Signup from "./Account/Signup";
import Chat from "./Chat";

function App() {
  const token = useSelector(R.path(["user", "token"]));
  return (
    <div className="App">
      <div className="header">
        <Banner isConnected={!!token}/>
      </div>
      <Modal/>
      {token &&
      <>
        <div className="main">
          <div className="map">
            <Map/>
          </div>
          <Chat/>
        </div>
      </>
      }
      {!token &&
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Redirect to="/"/>
      </Switch>
      }
    </div>
  );
}

export default App;
